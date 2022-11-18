import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/asset-utils'

import {projectDetails} from './projectDetails'

export const urlFor = (source: SanityImageSource) => imageUrlBuilder(projectDetails()).image(source)
