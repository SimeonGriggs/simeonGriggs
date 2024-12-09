import groq from 'groq'
import type {LoaderFunctionArgs} from 'react-router'
import type {SanityDocument} from 'sanity'

import {generateOGImage} from '~/lib/generateOGImage.server'
import {client} from '~/sanity/client'
import {SANITY_IMAGE_OBJECT_STUB_ASSET} from '~/sanity/queries'

export const loader = async ({request}: LoaderFunctionArgs) => {
  // Check for valid id in request url search params
  const {origin, searchParams} = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Bad request', {status: 400})
  }

  const clientWithToken = client.withConfig({
    token: process.env.SANITY_READ_TOKEN,
  })

  const doc: SanityDocument | null = await clientWithToken.fetch(
    groq`*[_id == $id][0]{ 
      ..., 
      image { 
        ..., 
        crop,
        hotspot,
        asset->{ 
          ${SANITY_IMAGE_OBJECT_STUB_ASSET}
        } 
      }
    }`,
    {id},
  )

  if (!doc) {
    return new Response('Bad request', {status: 400})
  }

  const png = await generateOGImage(doc, origin)

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'cache-control':
        process.env.NODE_ENV !== 'production'
          ? 'public, immutable, no-transform, max-age=31536000'
          : 'no-cache',
    },
  })
}
