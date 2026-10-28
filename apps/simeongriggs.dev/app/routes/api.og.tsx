import {createImageUrlBuilder} from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/asset-utils'
import {cloudflareContext, getEnv} from '~/env.server'
import {renderOgImage} from '~/og/render.server'
import {getSanityClient} from '~/sanity/client.server'
import type {Route} from './+types/api.og'

type OgDocument = {
  title?: string | null
  published?: string | null
  updated?: string | null
  image?: SanityImageSource | null
}

export async function loader({request, context}: Route.LoaderArgs) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (id && (!/^[\w.-]{1,128}$/.test(id) || id.startsWith('drafts.'))) {
    return new Response('Invalid document ID', {status: 400})
  }

  const cache = (caches as CacheStorage & {default: Cache}).default
  const cacheKey = new Request(url.toString())
  const cached = await cache.match(cacheKey)
  if (cached) return cached

  const client = getSanityClient(context)
  const doc = id
    ? await client.fetch<OgDocument | null>(
        '*[_id == $id][0]{title,published,updated,image{asset,crop,hotspot}}',
        {id},
      )
    : {title: 'Hello, internet!'}
  if (!doc) return new Response('Document not found', {status: 404})

  const env = getEnv(context)
  if (!env.ASSETS) throw new Error('Missing ASSETS binding for OG fonts')
  const imageUrl =
    doc.image &&
    typeof doc.image === 'object' &&
    'asset' in doc.image &&
    doc.image.asset
      ? createImageUrlBuilder(client)
          .image(doc.image)
          .width(400)
          .height(630)
          .format('png')
          .url()
      : undefined
  const png = await renderOgImage(
    {...doc, title: doc.title || 'Hello, internet!', imageUrl},
    env.ASSETS,
    url.origin,
  )
  const response = new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  })
  context
    .get(cloudflareContext)
    .ctx.waitUntil(cache.put(cacheKey, response.clone()))
  return response
}
