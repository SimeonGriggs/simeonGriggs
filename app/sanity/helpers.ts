import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/asset-utils'

import {projectDetails} from './projectDetails'
import type {Article} from '~/types/article'

export const urlFor = (source: SanityImageSource) => imageUrlBuilder(projectDetails()).image(source)

export function filterDataToSingleItem(data: Article[], preview = false): Article {
  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id && item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}
