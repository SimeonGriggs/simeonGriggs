import {useClient} from 'sanity'
import {Box, Button, Card, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {useCallback, useMemo, useState} from 'react'
import {RefreshIcon} from '@sanity/icons'

type Source = 'planetscale' | 'sanity_guides' | 'sanity_learn'

type ExternalArticleDoc = {
  _id?: string
  _type: 'externalArticle'
  unlisted?: boolean
  source: Source
  title: string
  url: string
  summary?: string
  published?: string
  updated?: string
}

function stripHtml(input: string) {
  return input
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function dateOnly(isoLike: string | undefined) {
  if (!isoLike) return undefined
  // Atom is ISO; Sanity dates may be ISO too. We store a `date` field (YYYY-MM-DD).
  const d = new Date(isoLike)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString().slice(0, 10)
}

function updatedIfAfter(published: string | undefined, updated: string | undefined) {
  if (!published || !updated) return undefined
  const p = new Date(published)
  const u = new Date(updated)
  if (Number.isNaN(p.getTime()) || Number.isNaN(u.getTime())) return undefined
  return u.getTime() > p.getTime() ? updated : undefined
}

async function getExistingIdsByUrl(
  client: ReturnType<typeof useClient>,
  source: Source,
  urls: string[],
) {
  if (urls.length === 0) return new Map<string, string>()

  const result = await client.fetch<{_id: string; url: string}[]>(
    `*[_type == "externalArticle" && source == $source && url in $urls]{
      _id,
      url
    }`,
    {source, urls},
  )

  return new Map(result.map((d) => [d.url, d._id]))
}

async function getExistingDocsByUrl(
  client: ReturnType<typeof useClient>,
  source: Source,
  urls: string[],
) {
  if (urls.length === 0) return []

  return await client.fetch<{_id: string; url: string; _updatedAt: string}[]>(
    `*[_type == "externalArticle" && source == $source && url in $urls]{
      _id,
      url,
      _updatedAt
    }`,
    {source, urls},
  )
}

function pickCanonicalIds(existing: {_id: string; url: string; _updatedAt: string}[]) {
  const byUrl = new Map<string, {_id: string; _updatedAt: string}>()
  const duplicates: string[] = []

  for (const doc of existing) {
    const current = byUrl.get(doc.url)
    if (!current) {
      byUrl.set(doc.url, {_id: doc._id, _updatedAt: doc._updatedAt})
      continue
    }

    // Keep the most recently updated doc as canonical; delete the rest
    const keepThis = new Date(doc._updatedAt).getTime() > new Date(current._updatedAt).getTime()
    if (keepThis) {
      duplicates.push(current._id)
      byUrl.set(doc.url, {_id: doc._id, _updatedAt: doc._updatedAt})
    } else {
      duplicates.push(doc._id)
    }
  }

  const canonical = new Map(Array.from(byUrl.entries()).map(([url, v]) => [url, v._id]))
  return {canonical, duplicates}
}

async function fetchSanityQuery<T>(
  projectId: string,
  dataset: string,
  query: string,
) {
  const url = new URL(`https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}`)
  url.searchParams.set('query', query)
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {'content-type': 'application/json'},
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Sanity query failed (${res.status}): ${text.slice(0, 400)}`)
  }
  const json = (await res.json()) as {result: T}
  return json.result
}

async function fetchPlanetScaleFeed(authorName: string) {
  const res = await fetch('https://planetscale.com/blog/feed.atom')
  if (!res.ok) throw new Error(`PlanetScale feed failed (${res.status})`)
  const xml = await res.text()
  const doc = new DOMParser().parseFromString(xml, 'application/xml')
  const entries = Array.from(doc.querySelectorAll('feed > entry'))

  return entries
    .map((entry) => {
      const title = entry.querySelector('title')?.textContent?.trim() || ''
      const url = entry.querySelector('link')?.getAttribute('href')?.trim() || ''
      const published = entry.querySelector('published')?.textContent?.trim()
      const updated = entry.querySelector('updated')?.textContent?.trim()
      const summaryHtml = entry.querySelector('summary')?.textContent || ''
      const author = entry.querySelector('author > name')?.textContent?.trim() || ''

      return {
        title,
        url,
        published: dateOnly(published),
        updated: dateOnly(updated),
        summary: stripHtml(summaryHtml),
        author,
      }
    })
    .filter((e) => e.title && e.url)
    .filter((e) => (authorName ? e.author === authorName : true))
}

type ExchangeGuide = {
  _id: string
  title: string | null
  slug: {current: string | null} | null
  published: string | null
  updated: string | null
  summary: string | null
}

type LearnCourse = {
  _id: string
  title: string | null
  slug: {current: string | null} | null
  published: string | null
  summary: string | null
}

function ExternalArticlesTool() {
  const client = useClient({apiVersion: '2023-10-01'})
  const [busy, setBusy] = useState<null | Source | 'all'>(null)
  const [log, setLog] = useState<string[]>([])

  const authorName = 'Simeon Griggs'
  const userIds = useMemo(
    () => ({
      exchange: `e-cfe6c944570e1d29a8a0a8722108c4af`,
      learn: `ee20547b-3a51-4515-b4d4-dd7461928291`,
    }),
    [],
  )

  const writeDocs = useCallback(
    async (docs: ExternalArticleDoc[], opts?: {deleteIds?: string[]}) => {
      const tx = client.transaction()
      for (const id of opts?.deleteIds ?? []) tx.delete(id)
      for (const doc of docs) {
        if (doc._id) {
          const {_id, ...rest} = doc
          tx.patch(_id, (p) => p.set(rest))
        } else {
          tx.create(doc)
        }
      }
      await tx.commit({autoGenerateArrayKeys: true})
      return docs.length
    },
    [client],
  )

  const syncPlanetScale = useCallback(async (force?: boolean) => {
    const feedEntries = await fetchPlanetScaleFeed(authorName)
    const urls = feedEntries.map((e) => e.url)
    const existing = force
      ? pickCanonicalIds(await getExistingDocsByUrl(client, 'planetscale', urls))
      : {canonical: await getExistingIdsByUrl(client, 'planetscale', urls), duplicates: []}
    const docs: ExternalArticleDoc[] = []

    for (const entry of feedEntries) {
      const _id = existing.canonical.get(entry.url)
      const updated = updatedIfAfter(entry.published, entry.updated)
      docs.push({
        _id,
        _type: 'externalArticle',
        unlisted: false,
        source: 'planetscale',
        title: entry.title,
        url: entry.url,
        summary: entry.summary,
        published: entry.published,
        updated,
      })
    }

    return await writeDocs(docs, {deleteIds: existing.duplicates})
  }, [authorName, client, writeDocs])

  const syncSanityGuides = useCallback(async (force?: boolean) => {
    const query = `*[
      _type == "contribution.guide"
      && defined(slug.current)
      && hidden != true
      && "${userIds.exchange}" in authors[]._ref
    ]|order(publishedAt desc) {
      _id,
      title,
      slug,
      "published": publishedAt,
      "updated": _updatedAt,
      "summary": description
    }`

    const guides = await fetchSanityQuery<ExchangeGuide[]>(
      '81pocpw8',
      'production',
      query,
    )

    const urls = guides
      .map((g) => g.slug?.current)
      .filter(Boolean)
      .map((slug) => `https://www.sanity.io/guides/${slug}`)
    const existing = force
      ? pickCanonicalIds(await getExistingDocsByUrl(client, 'sanity_guides', urls))
      : {canonical: await getExistingIdsByUrl(client, 'sanity_guides', urls), duplicates: []}

    const docs: ExternalArticleDoc[] = []
    for (const g of guides) {
      const slug = g.slug?.current
      const url = slug ? `https://www.sanity.io/guides/${slug}` : null
      if (!g.title || !url) continue
      const _id = existing.canonical.get(url)
      docs.push({
        _id,
        _type: 'externalArticle',
        unlisted: false,
        source: 'sanity_guides',
        title: g.title,
        url,
        summary: g.summary ?? undefined,
        published: dateOnly(g.published ?? undefined),
        updated: dateOnly(g.updated ?? undefined),
      })
    }

    return await writeDocs(docs, {deleteIds: existing.duplicates})
  }, [client, userIds.exchange, writeDocs])

  const syncSanityLearn = useCallback(async (force?: boolean) => {
    const query = `*[_type == "course" && "${userIds.learn}" in authors[]._ref]{
      _id,
      title,
      slug,
      "summary": description,
      "published": _createdAt
    }`

    const courses = await fetchSanityQuery<LearnCourse[]>(
      '3do82whm',
      'next',
      query,
    )

    const urls = courses
      .map((c) => c.slug?.current)
      .filter(Boolean)
      .map((slug) => `https://www.sanity.io/learn/course/${slug}`)
    const existing = force
      ? pickCanonicalIds(await getExistingDocsByUrl(client, 'sanity_learn', urls))
      : {canonical: await getExistingIdsByUrl(client, 'sanity_learn', urls), duplicates: []}

    const docs: ExternalArticleDoc[] = []
    for (const c of courses) {
      const slug = c.slug?.current
      const url = slug ? `https://www.sanity.io/learn/course/${slug}` : null
      if (!c.title || !url) continue
      const _id = existing.canonical.get(url)
      docs.push({
        _id,
        _type: 'externalArticle',
        unlisted: false,
        source: 'sanity_learn',
        title: c.title,
        url,
        summary: c.summary ?? undefined,
        published: dateOnly(c.published ?? undefined),
      })
    }

    return await writeDocs(docs, {deleteIds: existing.duplicates})
  }, [client, userIds.learn, writeDocs])

  const run = useCallback(
    async (which: Source | 'all', opts?: {force?: boolean}) => {
      setBusy(which)
      setLog((l) => [
        `Starting sync: ${which}${opts?.force ? ' (force)' : ''} (${new Date().toLocaleString()})`,
        ...l,
      ])
      try {
        let count = 0
        if (which === 'planetscale' || which === 'all') {
          const n = await syncPlanetScale(opts?.force)
          count += n
          setLog((l) => [`PlanetScale upserted: ${n}`, ...l])
        }
        if (which === 'sanity_guides' || which === 'all') {
          const n = await syncSanityGuides(opts?.force)
          count += n
          setLog((l) => [`Sanity guides upserted: ${n}`, ...l])
        }
        if (which === 'sanity_learn' || which === 'all') {
          const n = await syncSanityLearn(opts?.force)
          count += n
          setLog((l) => [`Sanity learn upserted: ${n}`, ...l])
        }
        setLog((l) => [`Done. Total upserted: ${count}`, ...l])
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        setLog((l) => [`Error: ${msg}`, ...l])
      } finally {
        setBusy(null)
      }
    },
    [syncPlanetScale, syncSanityGuides, syncSanityLearn],
  )

  return (
    <Container width={2} padding={4}>
      <Stack space={4}>
        <Heading size={3}>External Articles</Heading>
        <Text muted>
          Imports and upserts external articles into your dataset. Uses your
          current Studio permissions for writes.
        </Text>

        <Card padding={3} radius={2} shadow={1} tone="transparent">
          <Stack space={3}>
            <Flex gap={2} wrap="wrap">
              <Button
                icon={RefreshIcon}
                text="Sync all"
                tone="primary"
                disabled={Boolean(busy)}
                onClick={() => run('all')}
              />
              <Button
                text="Force sync all"
                tone="critical"
                disabled={Boolean(busy)}
                onClick={() => run('all', {force: true})}
              />
              <Button
                text="PlanetScale"
                disabled={Boolean(busy)}
                onClick={() => run('planetscale')}
              />
              <Button
                text="Force PlanetScale"
                tone="critical"
                disabled={Boolean(busy)}
                onClick={() => run('planetscale', {force: true})}
              />
              <Button
                text="Sanity guides"
                disabled={Boolean(busy)}
                onClick={() => run('sanity_guides')}
              />
              <Button
                text="Force guides"
                tone="critical"
                disabled={Boolean(busy)}
                onClick={() => run('sanity_guides', {force: true})}
              />
              <Button
                text="Sanity Learn"
                disabled={Boolean(busy)}
                onClick={() => run('sanity_learn')}
              />
              <Button
                text="Force learn"
                tone="critical"
                disabled={Boolean(busy)}
                onClick={() => run('sanity_learn', {force: true})}
              />
            </Flex>

            <Box>
              <Text size={1} muted>
                PlanetScale author filter: <strong>{authorName}</strong>
              </Text>
            </Box>
          </Stack>
        </Card>

        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Heading size={1}>Log</Heading>
            <Stack space={2}>
              {log.length === 0 ? (
                <Text muted size={1}>
                  No runs yet.
                </Text>
              ) : (
                log.slice(0, 30).map((line, i) => (
                  <Text key={i} size={1}>
                    {line}
                  </Text>
                ))
              )}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}

export const externalArticlesTool = {
  name: 'external-articles',
  title: 'External articles',
  component: ExternalArticlesTool,
  icon: RefreshIcon,
}

