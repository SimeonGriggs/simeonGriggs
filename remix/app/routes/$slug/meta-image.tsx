import {LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {filterDataToSingleItem} from '~/lib/sanity/helpers'
import {articleQuery} from '~/lib/sanity/queries'
import {getClient} from '~/lib/sanity/getClient'
import {usePreviewSubscription} from '~/lib/sanity/usePreviewSubscription'
import MetaImage from '~/components/MetaImage'

export const handle = `meta-image`

export const loader: LoaderFunction = async (props) => {
  const {request, params} = props
  const requestUrl = new URL(request?.url)
  // const ENV = getEnv()
  const preview = requestUrl?.searchParams?.get('preview') === process.env.SANITY_PREVIEW_SECRET

  // This query can return more than one document, eg, a draft and published version
  const articles = await getClient(preview).fetch(articleQuery, params)
  // const articles = [{_id: 'yeah', content: []}]

  // If preview is enabled, get the draft, otherwise, get the published
  const article = filterDataToSingleItem(articles, preview)

  return {initialData: article, query: articleQuery, params, preview}
}

export default function Screenshot() {
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

  return <MetaImage article={article} />
}
