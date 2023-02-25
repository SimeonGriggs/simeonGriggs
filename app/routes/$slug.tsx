import type {ActionFunction, LinksFunction, LoaderArgs, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {PreviewSuspense} from '@sanity/preview-kit'

import Article, {PreviewArticle} from '~/components/Article'
import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/constants'
import {removeTrailingSlash} from '~/lib/utils/helpers'
import {getClient, writeClient} from '~/sanity/client'
import {articleQuery} from '~/sanity/queries'
import {getSession} from '~/sessions'
import styles from '~/styles/app.css'
import {articleZ} from '~/types/article'
import {commentZ} from '~/types/comment'

export const handle = {id: `article`}

export const links: LinksFunction = () => {
  return [
    {rel: 'preload', href: styles, as: 'style'},
    {rel: 'stylesheet', href: styles},
  ]
}

export const meta: MetaFunction<typeof loader> = (props) => {
  const {data, parentsData} = props
  // console.log(props)
  const {siteMeta} = parentsData?.root ?? {}

  const {article} = data ?? {}

  if (!article?.title) {
    return {title: `Article not found`}
  }

  // Create meta image
  const {_id, title, summary} = article
  const remoteUrl = `https://www.simeongriggs.dev`
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : remoteUrl
  const ogImageUrl = new URL(`${baseUrl}/resource/og`)
  ogImageUrl.searchParams.set(`id`, _id)

  const imageMeta = {
    'og:image:width': String(OG_IMAGE_WIDTH),
    'og:image:height': String(OG_IMAGE_HEIGHT),
    'og:image': ogImageUrl.toString(),
  }

  // SEO Meta
  const pageTitle = `${title} | ${siteMeta?.title}`
  const canonicalUrl = new URL(siteMeta.siteUrl ?? window.location.origin)
  canonicalUrl.pathname = article.slug.current
  const canonical = removeTrailingSlash(canonicalUrl.toString())

  return {
    title: pageTitle,
    canonical,
    description: summary,
    'twitter:card': 'summary_large_image',
    'twitter:creator': String(siteMeta.author),
    'twitter:title': pageTitle,
    'twitter:description': summary,
    'og:url': canonical,
    'og:title': pageTitle,
    'og:description': summary,
    'og:type': 'website',
    ...imageMeta,
  }
}

export const action: ActionFunction = async ({request}) => {
  const body = await request.formData()

  // Basic honeypot check
  if (body?.get(`validation`)) {
    return null
  }

  const comment = commentZ.parse({
    _type: 'comment',
    content: String(body.get(`content`)),
    name: String(body.get(`name`)),
    commentKey: String(body.get(`_key`)),
    email: String(body.get(`email`)),
    commentOn: {
      _type: `reference`,
      _ref: String(body.get(`_id`)),
    },
  })

  const data = await writeClient.create(comment).then((res) => res)

  return data
}

export const loader = async ({request, params}: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')
  const preview = Boolean(token)

  const article = await getClient(preview)
    .fetch(articleQuery, params)
    .then((result) => (result ? articleZ.parse(result) : null))

  if (!article) {
    throw new Response(`Article not found`, {status: 404})
  }

  return json({
    article,
    preview,
    query: preview ? articleQuery : null,
    params: preview ? params : null,
    // Note: This makes the token available to the client if they have an active session
    // This is useful to show live preview to unauthenticated users
    // If you would rather not, replace token with `null` and it will rely on your Studio auth
    token: preview ? token : null,
  })
}

export default function Index() {
  const {article, preview, query, params, token} = useLoaderData<typeof loader>()

  if (preview && query && params && token) {
    return (
      <PreviewSuspense fallback={<Article {...article} />}>
        <PreviewArticle query={query} params={params} token={token} />
      </PreviewSuspense>
    )
  }

  return <Article {...article} />
}
