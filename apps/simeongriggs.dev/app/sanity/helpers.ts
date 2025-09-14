import type {SanityImageSource} from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'

import {projectDetails} from './projectDetails'

export const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(projectDetails()).image(source)
