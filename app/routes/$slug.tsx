import type {LinksFunction, LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {json} from '@remix-run/node'
import {PortableText} from '@portabletext/react'

import {articleQuery} from '~/sanity/queries'
import {client} from '~/sanity/client'

import styles from '~/styles/app.css'
import type {Article} from '~/types/article'
import {articlesZ} from '~/types/article'
import TableOfContents from '~/components/TableOfContents'
import {filterDataToSingleItem} from '~/sanity/helpers'
// import SanityImage from '~/components/SanityImage'

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

export default function Index() {
  const {article} = useLoaderData<LoaderData>()

  const {
    title,
    tableOfContents,
    content,
    // image
  } = article

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full p-12 md:w-1/3">
        {tableOfContents && tableOfContents?.length > 0 ? (
          <TableOfContents value={tableOfContents} />
        ) : null}
      </div>
      <div className="w-full p-12 md:w-2/3">
        {/* <p>Only width, 100</p>
        <SanityImage asset={image} width={100} />
        <br />
        <p>Only height, 200</p>
        <SanityImage asset={image} height={200} />
        <br />
        <p>Height + Width, 400x100</p>
        <SanityImage asset={image} width={400} height={100} />
        <br />
        <p>No height or width</p>
        <SanityImage asset={image} /> */}
        {content && content?.length > 0 ? (
          <div className="prose prose-xl prose-blue">
            <h1>{title}</h1>
            <PortableText value={content} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
