import {useQuery} from '@sanity/react-loader'
import type {LoaderFunctionArgs, MetaFunction} from 'react-router'
import {Outlet, ScrollRestoration, useLoaderData} from 'react-router'
import {LOCAL_OG_URL, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, PROD_OG_URL} from '@repo/constants'

import {Banner} from '~/components/Banner'
import Header from '~/components/Header'
import {removeTrailingSlash} from '~/lib/helpers'
import {fixInitialType} from '~/sanity/fixInitialType'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions'
import {SITE_META_QUERY} from '~/sanity/queries'
import type {SiteMeta} from '~/types/siteMeta'
import {siteMetaZ} from '~/types/siteMeta'

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const {data: siteMeta} = data?.initial ?? {}

  if (!siteMeta) {
    return [{title: `Home page`}]
  }

  const baseUrl = process.env.NODE_ENV === 'development' ? LOCAL_OG_URL : PROD_OG_URL
  const ogImageUrl = new URL(`/image`, baseUrl)
  ogImageUrl.searchParams.set(`id`, siteMeta._id)

  // SEO Meta
  const pageTitle = `${siteMeta.title} | ${siteMeta?.description}`
  const canonical = siteMeta.siteUrl
    ? removeTrailingSlash(new URL(siteMeta.siteUrl).toString())
    : ``

  return [
    {title: pageTitle},
    {name: 'description', content: siteMeta.description},
    {property: 'twitter:card', content: 'summary_large_image'},
    {property: 'twitter:creator', content: String(siteMeta?.author)},
    {property: 'twitter:title', content: pageTitle},
    {property: 'twitter:description', content: siteMeta.description},
    {property: 'og:url', content: canonical},
    {property: 'og:title', content: pageTitle},
    {property: 'og:description', content: siteMeta.description},
    {property: 'og:type', content: 'website'},
    {property: 'og:image:width', content: String(OG_IMAGE_WIDTH)},
    {property: 'og:image:height', content: String(OG_IMAGE_HEIGHT)},
    {property: 'og:image', content: ogImageUrl.toString()},
  ]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {options, preview} = await loadQueryOptions(request.headers)

  const query = SITE_META_QUERY
  const params = {}

  const initial = await loadQuery(query, params, options).then((result) => ({
    ...result,
    data: siteMetaZ.parse(result.data),
  }))

  return {
    initial,
    query,
    params,
    preview,
  }
}

export default function Website() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data: siteMeta} = useQuery<SiteMeta>(query, params, fixInitialType(initial))

  return (
    <>
      {siteMeta?.title ? <Header title={siteMeta.title} /> : null}
      <Banner />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
