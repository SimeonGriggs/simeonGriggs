import {useState} from 'react'
import type {MetaFunction, LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'

import {filterDataToSingleItem} from '~/lib/sanity/helpers'
import {articleQuery} from '~/lib/sanity/queries'
import {getClient} from '~/lib/sanity/getClient'
import {removeTrailingSlash} from '~/lib/utils/helpers'

import Date from '~/components/Date'
import Label from '~/components/Label'
import Preview from '~/components/Preview'
import ProseableText from '~/components/ProseableText'
import TableOfContents from '~/components/TableOfContents'

export const handle = `article`

export const meta: MetaFunction = ({data, parentsData, location}) => {
  const {title, summary, image} = data?.initialData ?? {}
  const {siteMeta} = parentsData?.root ?? {}

  const canonical = removeTrailingSlash(siteMeta?.siteUrl + location.pathname)
  const canonicalMetaImage = removeTrailingSlash(`${canonical}/meta-image`)

  const imageWidth = `1200`
  const imageHeight = `630`
  const imageUrl = new URL(`https://api.apiflash.com/v1/urltoimage`)
  imageUrl.searchParams.set(`access_key`, `21a6a19367114878b3b23d4ef68504d4`)
  imageUrl.searchParams.set(`url`, canonicalMetaImage)
  imageUrl.searchParams.set(`height`, imageHeight)
  imageUrl.searchParams.set(`width`, imageWidth)
  imageUrl.searchParams.set(`format`, `png`)
  imageUrl.searchParams.set(`response_type`, `image`)

  const imageMeta = image
    ? {
        'og:image:width': imageWidth,
        'og:image:height': imageHeight,
        'og:image': imageUrl.toString(),
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
  const preview = requestUrl?.searchParams?.get('preview') === process.env.SANITY_PREVIEW_SECRET
  const initialData = await getClient(preview).fetch(articleQuery, params)

  return {
    initialData,
    preview,
    query: preview ? articleQuery : ``,
    params: preview ? params : {},
  }
}

// Runs client side
export default function Article() {
  const {initialData, preview} = useLoaderData()
  const [data, setData] = useState(initialData)

  // The query may return more than one document, eg, a draft and published version
  // If preview is enabled, get the draft, otherwise, get the published
  const article = filterDataToSingleItem(data, preview)

  if (!article) {
    return null
  }

  return (
    <>
      {preview && <Preview data={data} setData={setData} />}
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
      <section className="row-start-3 md:row-start-2 col-span-6 lg:col-start-8 lg:col-span-8 mt-6 md:mt-0 pb-24">
        {article?.published ? (
          <Date updated={article?.updated} published={article.published} />
        ) : null}
        {article?.content?.length > 0 ? <ProseableText blocks={article.content} /> : null}
      </section>
    </>
  )
}
