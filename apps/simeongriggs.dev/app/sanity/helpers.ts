import type {SanityImageSource} from '@sanity/asset-utils'
import {createImageUrlBuilder} from '@sanity/image-url'

import {projectDetails} from './projectDetails'

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(projectDetails()).image(source)
