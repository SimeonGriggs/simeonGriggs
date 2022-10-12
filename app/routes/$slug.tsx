import type {LinksFunction, LoaderFunction, MetaFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {json} from '@remix-run/node'
import {PortableText} from '@portabletext/react'

import {articleQuery} from '~/sanity/queries'
import {client} from '~/sanity/client'

import styles from '~/styles/app.css'
import type {Article} from '~/types/article'
import {articlesZ} from '~/types/article'
import TableOfContents from '~/components/TableOfContents'
import {filterDataToSingleItem, urlFor} from '~/sanity/helpers'
import {removeTrailingSlash} from '~/lib/utils/helpers'
import type {SiteMeta} from '~/types/siteMeta'
// import SanityImage from '~/components/SanityImage'

export const handle = `article`

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const loader: LoaderFunction = async ({params}) => {
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

type LoaderData = {
  article: Awaited<Article>
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

  const {article, preview} = data ?? {}

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

export default function Index() {
  const {article} = useLoaderData<LoaderData>()

  const {
    title,
    summary,
    tableOfContents,
    content,
    // image
  } = article

  return (
    <div className="mt-32 grid grid-cols-1 gap-12 px-6 md:mt-0 md:grid-cols-12 md:gap-0 md:px-0 lg:grid-cols-16">
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
          <div className="prose prose-xl prose-blue">
            <PortableText value={content} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
