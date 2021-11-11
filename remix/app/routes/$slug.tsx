import type {MetaFunction, LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'

import {urlFor, filterDataToSingleItem} from '~/lib/sanity/helpers'
import {articleQuery} from '~/lib/sanity/queries'
import {getClient} from '~/lib/sanity/getClient'
import {getEnv} from '~/lib/utils/env'
import {usePreviewSubscription} from '~/lib/sanity/usePreviewSubscription'

import Date from '~/components/Date'
import Label from '~/components/Label'
import Preview from '~/components/Preview'
import ProseableText from '~/components/ProseableText'
import TableOfContents from '~/components/TableOfContents'

export const handle = `article`

export const meta: MetaFunction = ({data, parentsData, location}) => {
  const {title, summary, image} = data?.initialData ?? {}
  const {siteMeta} = parentsData?.root ?? {}
  const canonical = siteMeta?.siteUrl + location.pathname
  const imageWidth = 1200
  const imageHeight = 630

  const imageMeta = image
    ? {
        'og:image:width': image ? String(imageWidth) : null,
        'og:image:height': image ? String(imageHeight) : null,
        'og:image': image ? urlFor(image).height(imageHeight).width(imageWidth).toString() : null,
      }
    : {}

  return {
    title: `${title} | ${siteMeta?.title}`,
    description: summary,
    canonical,
    'twitter:card': 'summary_large_image',
    'twitter:creator': siteMeta?.author,
    'twitter:title': title,
    'twitter:description': summary,
    'og:url': canonical,
    ...imageMeta,
  }
}

// export const links: LinksFunction = () => {
//   return [{rel: 'canonical', href: `hmm`}]
// }

// Runs server side
export const loader: LoaderFunction = async (props) => {
  const {request, params} = props
  const requestUrl = new URL(request?.url)
  const ENV = getEnv()
  const preview = requestUrl?.searchParams?.get('preview') === ENV.SANITY_PREVIEW_SECRET

  // This query can return more than one document, eg, a draft and published version
  const articles = await getClient(preview).fetch(articleQuery, params)
  // const articles = [{_id: 'yeah', content: []}]

  // If preview is enabled, get the draft, otherwise, get the published
  const article = filterDataToSingleItem(articles, preview)

  return {initialData: article, query: articleQuery, params, preview}
}

// Runs client side
export default function Article() {
  const {initialData, query, params, preview} = useLoaderData()

  const {data: articles} = usePreviewSubscription(query, {
    params,
    initialData,
    enabled: preview,
  })
  // const articles = initialData

  const article = filterDataToSingleItem(articles, preview)

  if (!article) {
    return null
  }

  return (
    <>
      {preview && <Preview />}
      <header className="mt-32 md:mt-0 row-start-1 col-span-6 md:col-start-3 md:col-span-10 lg:col-start-5 lg:col-span-11">
        <div className="py-12 md:py-24 max-w-xl">
          {article?.title ? (
            <h1 className="leading-none font-black mb-8 tracking-tighter text-4xl md:text-6xl text-blue-500">
              {article.title}
            </h1>
          ) : null}
          {article?.summary ? (
            <p className="text-lg dark:text-blue-100 md:leading-8 font-mono">{article.summary}</p>
          ) : null}
        </div>
      </header>
      <aside className="mb-4 md:mb-0 row-start-2 md:row-start-2 col-span-6 md:col-start-3 md:col-span-3 lg:col-start-5 lg:col-span-3 relative">
        {article?.content?.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-4 md:pr-12 sticky top-6">
            <Label>Table of Contents</Label>
            <TableOfContents blocks={article.content} />
          </div>
        ) : null}
      </aside>
      <section className="row-start-3 md:row-start-2 col-span-6 lg:col-start-8 lg:col-span-8 pb-24">
        {article?.published ? (
          <Date updated={article?.updated} published={article.published} />
        ) : null}
        {article?.content?.length > 0 ? <ProseableText blocks={article.content} /> : null}
      </section>
    </>
  )
}
