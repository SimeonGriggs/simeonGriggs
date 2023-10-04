import {useLoaderData} from '@remix-run/react'
import type {LinksFunction, MetaFunction, SerializeFrom} from '@remix-run/node'
import {json} from '@remix-run/node'

import HomeBlog from '~/components/HomeBlog'
import HomeCommunity from '~/components/HomeCommunity'
import HomeTitle from '~/components/HomeTitle'
import Intro from '~/components/Intro'
import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/constants'
import {useRootLoaderData} from '~/hooks/useRootLoaderData'
import {removeTrailingSlash} from '~/lib/helpers'
import type {loader as rootLoader} from '~/root'
import {client, exchangeClient} from '~/sanity/client'
import {exchangeParams, exchangeQuery, homeQuery} from '~/sanity/queries'
import styles from '~/styles/app.css'
import {articleStubsZ, exchangeStubsZ} from '~/types/stubs'

export const handle = {id: `home`}

export const links: LinksFunction = () => {
  return [
    {rel: 'preload', href: styles, as: 'style'},
    {rel: 'stylesheet', href: styles},
  ]
}

export const meta: MetaFunction<typeof loader> = (props) => {
  const {data, matches} = props
  const article = data ? data.articles.find((a) => a.source === 'blog' && a.image) : null

  const rootData = matches.find((match) => match?.id === `root`) as
    | {data: SerializeFrom<typeof rootLoader>}
    | undefined
  const siteMeta = rootData ? rootData.data.siteMeta : null

  if (!article || !siteMeta) {
    return [{title: `Article not found`}]
  }

  const remoteUrl = `https://www.simeongriggs.dev`
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : remoteUrl
  const ogImageUrl = new URL(`${baseUrl}/resource/og`)

  // SEO Meta
  const pageTitle = `${siteMeta.title} | ${siteMeta?.description}`
  const canonical = siteMeta.siteUrl
    ? removeTrailingSlash(new URL(siteMeta.siteUrl).toString())
    : ``

  return [
    {title: pageTitle},
    {name: 'description', content: siteMeta.description},
    {property: 'twitter:card', content: 'summary_large_image'},
    {property: 'twitter:creator', content: String(siteMeta?.author)},
    {property: 'twitter:title', content: pageTitle},
    {property: 'twitter:description', content: siteMeta.description},
    {property: 'og:url', content: canonical},
    {property: 'og:title', content: pageTitle},
    {property: 'og:description', content: siteMeta.description},
    {property: 'og:type', content: 'website'},
    {property: 'og:image:width', content: String(OG_IMAGE_WIDTH)},
    {property: 'og:image:height', content: String(OG_IMAGE_HEIGHT)},
    {property: 'og:image', content: ogImageUrl.toString()},
  ]
}

export const loader = async () => {
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
    .filter((a) => a.published)
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

export default function Index() {
  const {articles} = useLoaderData<typeof loader>()
  const {siteMeta} = useRootLoaderData()

  return (
    <section className="grid grid-cols-1 px-4 md:grid-cols-12 md:px-0 lg:grid-cols-16">
      <div className="flex flex-col gap-y-12 pb-12 pt-48 md:col-span-6 md:col-start-6 md:gap-y-24 md:py-48 lg:col-span-8 lg:col-start-8">
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
