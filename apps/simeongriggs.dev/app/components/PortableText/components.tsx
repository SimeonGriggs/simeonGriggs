import type {PortableTextComponents} from '@portabletext/react'

import BlockHeading from './BlockHeading'

import BlockNormal from './BlockNormal'

export const commentComponents: PortableTextComponents = {
  block: {
    normal: BlockNormal,
    h2: BlockHeading,
    h3: BlockHeading,
  },
}
