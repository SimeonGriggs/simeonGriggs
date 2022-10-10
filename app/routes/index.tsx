import type {LinksFunction, LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import {json} from '@remix-run/node'

import {exchangeParams, exchangeQuery, homeQuery} from '~/sanity/queries'
import {client, exchangeClient} from '~/sanity/client'
import styles from '~/styles/app.css'
import type {CombinedStubs} from '~/types/stubs'
import {articleStubsZ, exchangeStubsZ} from '~/types/stubs'
import SanityImage from '~/components/SanityImage'

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

  const sortedArticles = allArticles
    .flat()
    .sort((a, b) =>
      a.published && b.published
        ? new Date(b.published).getTime() - new Date(a.published).getTime()
        : 0
    )

  return json({articles: sortedArticles})
}

type LoaderData = {
  articles: Awaited<CombinedStubs>
}

export default function Index() {
  const {articles} = useLoaderData<LoaderData>()

  return (
    <div className="grid grid-cols-1 gap-4 p-12">
      <h1 className="mb-6 text-2xl font-bold">Welcome to Remix with Sanity Studio v3</h1>
      {articles.length > 0 ? (
        <>
          {articles.map((article) => {
            switch (article.source) {
              case 'blog':
                return (
                  <article className="bg-blue-500 p-4 text-white" key={article._id}>
                    <SanityImage width={100} height={100} asset={article.image} />
                    <Link to={article.slug.current}>{article.title}</Link>
                    <br />
                  </article>
                )
              case 'exchange':
                return (
                  <article className="bg-orange-500 p-4 text-white" key={article._id}>
                    <a
                      href={`https://www.sanity.io/guides/${article.slug.current}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </article>
                )
              default:
                return null
            }
          })}
        </>
      ) : null}
    </div>
  )
}
