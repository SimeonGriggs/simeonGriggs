import type {MetaFunction} from 'react-router'
import {Outlet, ScrollRestoration, useLoaderData} from 'react-router'
import {
  LOCAL_OG_URL,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  PROD_OG_URL,
} from '../../../../packages/constants/src'

import {Banner} from '~/components/Banner'
import Header from '~/components/Header'
import {removeTrailingSlash} from '~/lib/helpers'
import {client} from '~/sanity/client'
import {SITE_META_QUERY} from '~/sanity/queries'
import type {SiteMeta} from '~/types/siteMeta'
import {siteMetaZ} from '~/types/siteMeta'
import type {Route} from './+types/_website'

export const meta: MetaFunction<Route.MetaArgs> = ({data}) => {
  const routeData = data as Awaited<ReturnType<typeof loader>>
  const {siteMeta} = routeData ?? {}

  if (!siteMeta) {
    return [{title: `Home page`}]
  }

  const baseUrl =
    import.meta.env.DEV ? LOCAL_OG_URL : PROD_OG_URL
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

export const loader = async ({request, context}: Route.LoaderArgs) => {
  const query = SITE_META_QUERY
  const params = {}

  const siteMeta = await client.fetch<SiteMeta>(query, params).then((result) => {
    return siteMetaZ.parse(result)
  })

  return {
    siteMeta,
  }
}

export default function Website() {
  const {siteMeta} = useLoaderData<typeof loader>()

  return (
    <>
      {siteMeta?.title ? <Header title={siteMeta.title} /> : null}
      <Banner />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
