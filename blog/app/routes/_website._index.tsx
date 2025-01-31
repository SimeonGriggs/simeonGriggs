import {useQuery} from '@sanity/react-loader'
import type {LinksFunction, LoaderFunctionArgs} from 'react-router'
import {useLoaderData} from 'react-router'

import HomeBlog from '~/components/HomeBlog'
import HomeCommunity from '~/components/HomeCommunity'
import HomeTitle from '~/components/HomeTitle'
import Intro from '~/components/Intro'
import {Timeline} from '~/components/Timeline'
import {useRootLoaderData} from '~/hooks/useRootLoaderData'
import {sortArticles} from '~/lib/sortArticles'
import {adminClient, exchangeClient} from '~/sanity/client.server'
import {fixInitialType} from '~/sanity/fixInitialType'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions'
import {
  EXCHANGE_QUERY,
  exchangeParams,
  HOME_QUERY,
  LEARN_QUERY,
  learnParams,
} from '~/sanity/queries'
import styles from '~/styles/app.css?url'
import type {ArticleStub} from '~/types/stubs'
import {combinedStubsZ, exchangeStubsZ, learnStubsZ} from '~/types/stubs'

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

  const [initial, exchangeArticles, learnArticles] = await Promise.all([
    await loadQuery(query, params, options).then((result) => ({
      ...result,
      data: combinedStubsZ.parse(result.data),
    })),
    await exchangeClient
      .fetch(EXCHANGE_QUERY, exchangeParams)
      .then((result) => exchangeStubsZ.parse(result)),
    await adminClient.fetch(LEARN_QUERY, learnParams).then((result) => learnStubsZ.parse(result)),
  ])

  return {initial, query, params, exchangeArticles, learnArticles, preview}
}

export default function Index() {
  const {initial, query, params, exchangeArticles, learnArticles} = useLoaderData<typeof loader>()
  const {data} = useQuery<ArticleStub[]>(query, params, fixInitialType(initial))
  const articles = data ? sortArticles([...data, ...exchangeArticles, ...learnArticles]) : []

  const rootLoader = useRootLoaderData()
  const siteMeta = rootLoader?.initial?.data

  return (
    <section className="grid grid-cols-1 px-4 md:grid-cols-12 md:px-0 lg:grid-cols-16">
      <div className="flex flex-col gap-y-12 pb-12 pt-48 md:col-span-6 md:col-start-6 md:py-48 lg:col-span-8 lg:col-start-8">
        <HomeTitle title="Hello, internet!" wave />

        {siteMeta?.bio && siteMeta?.bio?.length > 1 ? <Intro value={siteMeta.bio} /> : null}

        {Array.isArray(articles) ? <Timeline articles={articles} /> : null}
      </div>
    </section>
  )
}
