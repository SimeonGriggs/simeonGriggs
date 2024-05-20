import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'

import HomeBlog from '~/components/HomeBlog'
import HomeCommunity from '~/components/HomeCommunity'
import HomeTitle from '~/components/HomeTitle'
import Intro from '~/components/Intro'
import {useRootLoaderData} from '~/hooks/useRootLoaderData'
import {sortArticles} from '~/lib/sortArticles'
import {exchangeClient} from '~/sanity/client.server'
import {fixInitialType} from '~/sanity/fixInitialType'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions'
import {EXCHANGE_QUERY, exchangeParams, HOME_QUERY} from '~/sanity/queries'
import styles from '~/styles/app.css?url'
import type {ArticleStub} from '~/types/stubs'
import {articleStubsZ, exchangeStubsZ} from '~/types/stubs'

export const handle = {id: `home`}

export const links: LinksFunction = () => {
  return [
    {rel: 'preload', href: styles, as: 'style'},
    {rel: 'stylesheet', href: styles},
  ]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {options, preview} = await loadQueryOptions(request.headers)

  const query = HOME_QUERY
  const params = {}

  const [initial, exchangeArticles] = await Promise.all([
    await loadQuery(query, params, options).then((result) => ({
      ...result,
      data: articleStubsZ.parse(result.data),
    })),
    await exchangeClient
      .fetch(EXCHANGE_QUERY, exchangeParams)
      .then((result) => exchangeStubsZ.parse(result)),
  ])

  return json({initial, query, params, exchangeArticles, preview})
}

export default function Index() {
  const {initial, query, params, exchangeArticles} = useLoaderData<typeof loader>()
  const {data} = useQuery<ArticleStub[]>(query, params, fixInitialType(initial))
  const articles = data ? sortArticles([...data, ...exchangeArticles]) : []

  const rootLoader = useRootLoaderData()
  const siteMeta = rootLoader?.initial?.data

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
