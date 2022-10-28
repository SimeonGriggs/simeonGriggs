import type {ActionFunction, LinksFunction, LoaderArgs, MetaFunction} from '@remix-run/node'

import {useLoaderData} from '@remix-run/react'
import {json} from '@remix-run/node'
import {PortableText} from '@portabletext/react'

import styles from '~/styles/app.css'
import {articleQuery} from '~/sanity/queries'
import {client, getClient, writeClient} from '~/sanity/client'
import {articlesZ} from '~/types/article'
import TableOfContents from '~/components/TableOfContents'
import {filterDataToSingleItem, urlFor} from '~/sanity/helpers'
import {removeTrailingSlash} from '~/lib/utils/helpers'
import Subscribe from '~/components/Subscribe'
import {CommentsProvider} from '~/components/Comments/CommentsContext'
import {commentZ} from '~/types/comment'
import {commentComponents} from '~/components/PortableText/components'

export const handle = {id: `article`}

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const meta: MetaFunction<typeof loader> = (props) => {
  const {data, parentsData} = props
  const {siteMeta} = parentsData?.root ?? {}

  const {article} = data ?? {}

  if (!article?.title) {
    return {title: `Article not found`}
  }

  // Create meta image
  const {_updatedAt, title, summary, image, published, updated} = article
  let imageMeta = {}

  if (image?.asset) {
    const ogImageUrl = new URL(`https://og-simeongriggs.vercel.app/api/og`)
    ogImageUrl.searchParams.set(`title`, title ?? ``)
    ogImageUrl.searchParams.set(`published`, published ?? ``)
    ogImageUrl.searchParams.set(`updated`, updated ?? ``)
    ogImageUrl.searchParams.set(`_updatedAt`, _updatedAt)
    const imageWidth = 400
    const imageHeight = 630
    const imageUrl = urlFor(image).width(imageWidth).height(imageHeight).auto('format').toString()
    ogImageUrl.searchParams.set(`imageUrl`, imageUrl)

    imageMeta = {
      'og:image:width': 1200,
      'og:image:height': imageHeight,
      'og:image': ogImageUrl.toString(),
    }
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
  // Rendering drafts is enabled by using the _id as the slug
  // And passing in a matching _rev query param
  const requestUrl = new URL(request.url)
  const previewRev = requestUrl.searchParams.get(`_rev`)
  const previewSlug = previewRev
    ? await getClient(true).fetch(`*[_id == $id && _rev == $rev][0].slug.current`, {
        id: params.slug,
        rev: previewRev,
      })
    : null

  const articles = await getClient(previewSlug)
    .fetch(articleQuery, {slug: previewSlug ?? params.slug})
    .then((result) => articlesZ.parse(result))

  if (!articles.length) {
    throw new Response(`Article not found`, {status: 404})
  }

  // TODO: Re-add preview mode
  const article = filterDataToSingleItem(articles, false)

  return json({article})
}

export default function Index() {
  const {article} = useLoaderData<typeof loader>()

  const {title, summary, tableOfContents, content, comments} = article

  return (
    <div className="grid grid-cols-1 gap-12 px-4 pb-32 md:mt-0 md:grid-cols-12 md:gap-0 md:px-0 lg:grid-cols-16">
      <div className="grid-col-1 grid gap-12 pt-48 md:col-span-8 md:col-start-3 md:py-24 lg:col-span-8 lg:col-start-5">
        {title ? (
          <h1 className="text-4xl font-black leading-none tracking-tighter text-blue-500 md:text-6xl">
            {title}
          </h1>
        ) : null}
        {summary ? (
          <p className="max-w-xl font-mono leading-relaxed md:text-lg md:leading-loose">
            {summary}
          </p>
        ) : null}
      </div>
      <div className="md:col-span-2 md:col-start-3 md:row-start-2 lg:col-span-3 lg:col-start-5">
        {tableOfContents && tableOfContents?.length > 0 ? (
          <TableOfContents value={tableOfContents} />
        ) : null}
      </div>
      <div className="md:col-span-6 md:col-start-6 md:row-start-2 lg:col-span-7 lg:col-start-9">
        {content && content?.length > 0 ? (
          <div className="prose-xl prose prose-blue dark:prose-invert">
            {comments && comments?.length > 1 ? (
              <CommentsProvider comments={comments}>
                <PortableText value={content} components={commentComponents} />
              </CommentsProvider>
            ) : (
              <PortableText value={content} components={commentComponents} />
            )}
          </div>
        ) : null}

        <Subscribe />
      </div>
    </div>
  )
}
