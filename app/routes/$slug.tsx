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
          <p className="font-mono leading-relaxed md:text-lg md:leading-loose">{summary}</p>
        ) : null}
      </div>
      <div className="md:col-span-2 md:col-start-3 md:row-start-2 lg:col-span-3 lg:col-start-5">
        {tableOfContents && tableOfContents?.length > 0 ? (
          <TableOfContents value={tableOfContents} />
        ) : null}
      </div>
      <div className="md:col-span-6 md:col-start-6 md:row-start-2 lg:col-span-7 lg:col-start-9">
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
            <PortableText value={content} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
