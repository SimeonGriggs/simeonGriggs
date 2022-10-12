import type {LinksFunction, LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import {json} from '@remix-run/node'

import {exchangeParams, exchangeQuery, homeQuery} from '~/sanity/queries'
import {client, exchangeClient} from '~/sanity/client'
import styles from '~/styles/app.css'
import type {CombinedStubs} from '~/types/stubs'
import {articleStubsZ, exchangeStubsZ} from '~/types/stubs'
import SanityImage from '~/components/SanityImage'
import HomeBlog from '~/components/HomeBlog'
import HomeCommunity from '~/components/HomeCommunity'
import HomeTitle from '~/components/HomeTitle'

export const handle = `home`

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
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

  return (
    <section className="grid grid-cols-1 px-6 md:grid-cols-12 md:px-0 lg:grid-cols-16">
      <div className="flex flex-col gap-y-12 md:col-span-6 md:col-start-6 md:gap-y-24 md:py-48 lg:col-span-8 lg:col-start-8 ">
        <HomeTitle title="Hello, internet!" wave />

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
