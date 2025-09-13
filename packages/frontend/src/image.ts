import createImageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

import {SANITY_DATASET, SANITY_PROJECT_ID} from '@repo/constants'

const builder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
})

export function image(source: SanityImageSource) {
  return builder.image(source).auto('format')
}
