import type {LinksFunction, LoaderFunction, MetaFunction} from '@remix-run/node'
import {useLoaderData, useMatches} from '@remix-run/react'
import {json} from '@remix-run/node'

import {exchangeParams, exchangeQuery, homeQuery} from '~/sanity/queries'
import {client, exchangeClient} from '~/sanity/client'
import styles from '~/styles/app.css'
import type {CombinedStubs} from '~/types/stubs'
import {articleStubsZ, exchangeStubsZ} from '~/types/stubs'
import HomeBlog from '~/components/HomeBlog'
import HomeCommunity from '~/components/HomeCommunity'
import HomeTitle from '~/components/HomeTitle'
import {removeTrailingSlash} from '~/lib/utils/helpers'
import {urlFor} from '~/sanity/helpers'
import type {SiteMeta} from '~/types/siteMeta'
import Intro from '~/components/Intro'

export const handle = {id: `home`}

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const meta: MetaFunction = ({
  data,
  parentsData,
  location,
}: {
  data: {
    articles: CombinedStubs
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

  const article = data?.articles.find((a) => a.source === 'blog')

  if (!article) {
    return {title: `Article not found`}
  }

  // Create meta image
  const {title, summary, image} = article

  const ogImageUrl = new URL(`https://og-simeongriggs.vercel.app/api/og`)
  ogImageUrl.searchParams.set(`title`, `Hello, internet!`)
  const imageWidth = 400
  const imageHeight = 630
  const imageUrl = image ? urlFor(image).width(imageWidth).height(imageHeight).toString() : ``
  ogImageUrl.searchParams.set(`imageUrl`, imageUrl)

  const imageMeta = image
    ? {
        'og:image:width': 1200,
        'og:image:height': imageHeight,
        'og:image': ogImageUrl.toString(),
      }
    : {}

  // SEO Meta
  const pageTitle = `${title} | ${siteMeta?.description}`
  const canonical = siteMeta.siteUrl
    ? removeTrailingSlash(new URL(siteMeta.siteUrl).toString())
    : ``

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

export const loader: LoaderFunction = async ({request}) => {
  // Put site in preview mode if the right query param is used
  // const requestUrl = new URL(request.url)
  // const preview = requestUrl.searchParams.get(`preview`) === process.env.SANITY_PREVIEW_SECRET

  const allArticles = await Promise.all([
    await client.fetch(homeQuery).then((result) => articleStubsZ.parse(result)),
    await exchangeClient
      .fetch(exchangeQuery, exchangeParams)
      .then((result) => exchangeStubsZ.parse(result)),
  ])

  // Sort combined articles by date
  const sortedArticles = allArticles
    .flat()
    .sort((a, b) =>
      a.published && b.published
        ? new Date(b.published).getTime() - new Date(a.published).getTime()
        : 0
    )

  // If a `blog` post isn't the first one, move it to the top
  const firstBlogPostIndex = sortedArticles.findIndex((article) => article.source === `blog`)
  if (firstBlogPostIndex !== 0) {
    const firstBlogPost = sortedArticles[firstBlogPostIndex]
    sortedArticles.splice(firstBlogPostIndex, 1)
    sortedArticles.unshift(firstBlogPost)
  }

  return json({articles: sortedArticles})
}

type LoaderData = {
  articles: Awaited<CombinedStubs>
}

export default function Index() {
  const {articles} = useLoaderData<LoaderData>()
  const matches = useMatches()
  const siteMeta: SiteMeta = matches?.find((match) => match?.handle?.id === 'root')?.data?.siteMeta

  return (
    <section className="grid grid-cols-1 px-4 md:grid-cols-12 md:px-0 lg:grid-cols-16">
      <div className="flex flex-col gap-y-12 pt-48 pb-12 md:col-span-6 md:col-start-6 md:gap-y-24 md:py-48 lg:col-span-8 lg:col-start-8">
        <HomeTitle title="Hello, internet!" wave />

        {siteMeta?.bio && siteMeta?.bio?.length > 1 ? <Intro value={siteMeta.bio} /> : null}

        {articles.length > 0
          ? articles.map((article) => {
              switch (article.source) {
                case 'blog':
                  return <HomeBlog key={article._id} {...article} />
                case 'exchange':
                  return <HomeCommunity key={article._id} {...article} />
                default:
                  return null
              }
            })
          : null}
      </div>
    </section>
  )
}
