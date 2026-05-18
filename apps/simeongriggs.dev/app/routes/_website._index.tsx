import {useLoaderData} from 'react-router'

import {Timeline} from '~/components/Timeline'
import {useRootLoaderData} from '~/hooks/useRootLoaderData'
import {sortArticles} from '~/lib/sortArticles'
import {client} from '~/sanity/client'
import {HOME_QUERY} from '~/sanity/queries'
import styles from '@repo/tailwind/app.css?url'
import type {CombinedStubs} from '~/types/stubs'
import {combinedStubsZ} from '~/types/stubs'
import {components, Heading} from '@repo/frontend'
import {PortableText} from '@portabletext/react'
import type {Route} from './+types/_website._index'

export const handle = {id: `home`}

export const links: Route.LinksFunction = () => {
  return [
    {rel: 'preload', href: styles, as: 'style'},
    {rel: 'stylesheet', href: styles},
  ]
}

export const loader = async ({request, context}: Route.LoaderArgs) => {
  const query = HOME_QUERY
  const params = {}

  const data = await client.fetch(query, params).then((result) => {
    return combinedStubsZ.parse(result)
  })

  return {data}
}

export default function Index() {
  const {data} = useLoaderData<typeof loader>()
  const articles = data ? sortArticles(data) : []

  const rootLoader = useRootLoaderData()
  const siteMeta = rootLoader?.siteMeta

  return (
    <section className="lg:grid-cols-16 grid grid-cols-1 px-4 md:grid-cols-12 md:px-0">
      <div className="flex flex-col gap-y-12 pb-12 pt-48 md:col-span-6 md:col-start-6 md:py-48 lg:col-span-8 lg:col-start-8">
        <Heading as="h1">
          Hello, internet!
          <span className="wave ml-2">👋</span>
        </Heading>

        {siteMeta?.bio ? (
          <div>
            <PortableText value={siteMeta.bio} components={components} />
          </div>
        ) : null}

        {Array.isArray(articles) ? <Timeline articles={articles} /> : null}
      </div>
    </section>
  )
}
