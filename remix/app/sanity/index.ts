// import {Block} from 'sanity'
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {SanityImageSource} from '@sanity/image-url/lib/types/types'
// import cuid from 'cuid'

export const SANITY_PROJECT_ID = `az8av6xl`
export const SANITY_DATASET = `production`
export const SANITY_API_VERSION = `v2022-06-01`

export const client = new sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  // useCdn: process.env.NODE_ENV !== 'development',
  useCdn: true,
})

export async function getCurrentUser() {
  const userUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/${SANITY_API_VERSION}/users/me`
  return await fetch(userUrl, {credentials: `include`})
    .then((res) => res.json())
    .catch((err) => err)
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// export function textToBlocks(text: string) {
//   const value = text.split('\n').map((line) => ({
//     _key: cuid(),
//     _type: 'block',
//     children: [
//       {
//         _key: cuid(),
//         _type: 'span',
//         marks: [],
//         text: line,
//       },
//     ],
//     markDefs: [],
//     style: 'normal',
//   }))

//   return value as Block[]
// }
