import type {PortableTextComponents} from '@portabletext/react'

import BlockHeading from './BlockHeading'
import BlockHeadingTOC from './BlockHeadingTOC'
import BlockNormal from './BlockNormal'

export const commentComponents: PortableTextComponents = {
  block: {
    normal: BlockNormal,
    h2: BlockHeading,
    h3: BlockHeading,
  },
}

export const tocComponents: PortableTextComponents = {
  block: {
    h2: BlockHeadingTOC,
    h3: BlockHeadingTOC,
  },
}
