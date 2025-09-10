import createImageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import {client} from './client'

const {projectId, dataset} = client.config()
const builder = createImageUrlBuilder({
  projectId: projectId!,
  dataset: dataset!,
})

export function image(source: SanityImageSource) {
  return builder.image(source).auto('format')
}
