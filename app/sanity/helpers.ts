import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/asset-utils'

import {config} from './config'
import type {Article} from '~/types/article'

export const urlFor = (source: SanityImageSource) => imageUrlBuilder(config).image(source)

export function filterDataToSingleItem(data: Article[], preview = false): Article {
  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id && item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}
