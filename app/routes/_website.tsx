import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {json, Outlet, ScrollRestoration, useLoaderData} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'

import {Banner} from '~/components/Banner'
import Header from '~/components/Header'
import {LOCAL_URL, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL} from '~/constants'
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

  const baseUrl = process.env.NODE_ENV === 'development' ? LOCAL_URL : SITE_URL
  const ogImageUrl = new URL(`/resource/og`, baseUrl)

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

  return json({
    initial,
    query,
    params,
    preview,
  })
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
