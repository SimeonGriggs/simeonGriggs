import type {ActionFunction, LinksFunction, LoaderArgs, MetaFunction} from '@remix-run/node'

import {useLoaderData} from '@remix-run/react'
import {json} from '@remix-run/node'
import {PortableText} from '@portabletext/react'

import {articleQuery} from '~/sanity/queries'
import {client, writeClient} from '~/sanity/client'

import styles from '~/styles/app.css'
import type {Article} from '~/types/article'
import {articlesZ} from '~/types/article'
import TableOfContents from '~/components/TableOfContents'
import {filterDataToSingleItem, urlFor} from '~/sanity/helpers'
import {removeTrailingSlash} from '~/lib/utils/helpers'
import type {SiteMeta} from '~/types/siteMeta'
import Subscribe from '~/components/Subscribe'
import {CommentsProvider} from '~/components/Comments/CommentsContext'
import {commentZ} from '~/types/comment'

export const handle = {id: `article`}

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const meta: MetaFunction = ({
  data,
  parentsData,
  location,
}: {
  data: {
    article: Article
    preview: boolean
  }
  parentsData: {
    root: {
      siteMeta: SiteMeta
    }
  }
  location: any
}) => {
  const {siteMeta} = parentsData?.root ?? {}

  const {article} = data ?? {}

  if (!article?.title) {
    return {title: `Article not found`}
  }

  // Create meta image
  const {_updatedAt, title, summary, image, published, updated} = article

  const ogImageUrl = new URL(`https://og-simeongriggs.vercel.app/api/og`)
  ogImageUrl.searchParams.set(`title`, title ?? ``)
  ogImageUrl.searchParams.set(`published`, published ?? ``)
  ogImageUrl.searchParams.set(`updated`, updated ?? ``)
  ogImageUrl.searchParams.set(`_updatedAt`, _updatedAt)
  const imageWidth = 400
  const imageHeight = 630
  const imageUrl = urlFor(image).width(imageWidth).height(imageHeight).toString()
  ogImageUrl.searchParams.set(`imageUrl`, imageUrl)

  const imageMeta = image
    ? {
        'og:image:width': 1200,
        'og:image:height': imageHeight,
        'og:image': ogImageUrl.toString(),
      }
    : {}

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
    'twitter:creator': siteMeta?.author,
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

export const loader = async ({params}: LoaderArgs) => {
  // Put site in preview mode if the right query param is used
  // const requestUrl = new URL(request.url)
  // const preview = requestUrl.searchParams.get(`preview`) === process.env.SANITY_PREVIEW_SECRET

  const articles = await client
    .fetch(articleQuery, params)
    .then((result) => articlesZ.parse(result))

  // TODO: Re-add preview mode
  const article = filterDataToSingleItem(articles, false)

  return json({article})
}

export default function Index() {
  const {article} = useLoaderData<typeof loader>()

  const {title, summary, tableOfContents, content, comments} = article

  return (
    <div className="my-32 grid grid-cols-1 gap-12 px-4 md:mt-0 md:grid-cols-12 md:gap-0 md:px-0 lg:grid-cols-16">
      <div className="grid-col-1 grid gap-12 pt-12 md:col-span-8 md:col-start-3 md:py-24 lg:col-span-8 lg:col-start-5">
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
          <div className="prose prose-xl prose-blue dark:prose-invert">
            {comments && comments?.length > 1 ? (
              <CommentsProvider comments={comments}>
                <PortableText value={content} />
              </CommentsProvider>
            ) : (
              <PortableText value={content} />
            )}
          </div>
        ) : null}

        <Subscribe />
      </div>
    </div>
  )
}
