import type {PortableTextComponents} from '@portabletext/react'

import BlockHeading from './BlockHeading'
import BlockHeadingTOC from './BlockHeadingTOC'
import BlockNormal from './BlockNormal'
import TypeButton from './TypeButton'

import TypeCodeSandbox from './TypeCodeSandbox'
import TypeGallery from './TypeGallery'
import TypeTldraw from './TypeTldraw'

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

export const components: PortableTextComponents = {
  types: {
    break: () => <hr />,
    tldraw: TypeTldraw,

    // video: TypeVideo,
    gallery: TypeGallery,
    codeSandbox: TypeCodeSandbox,
    button: TypeButton,
  },
}
