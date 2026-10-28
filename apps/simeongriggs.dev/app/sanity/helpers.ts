import type {SanityImageSource} from '@sanity/asset-utils'
import {createImageUrlBuilder} from '@sanity/image-url'

import type {SanityPublicConfig} from './resolveSanityConfig'

export const urlFor = (source: SanityImageSource, config: SanityPublicConfig) =>
  createImageUrlBuilder(config).image(source)
