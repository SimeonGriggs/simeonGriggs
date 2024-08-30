import type {PortableTextComponents} from '@portabletext/react'

import BlockHeading from './BlockHeading'
import BlockHeadingTOC from './BlockHeadingTOC'
import BlockNormal from './BlockNormal'
import MarkLink from './MarkLink'
import MarkReference from './MarkReference'
import TypeButton from './TypeButton'
import TypeCode from './TypeCode'
import TypeCodeSandbox from './TypeCodeSandbox'
import TypeGallery from './TypeGallery'
import TypeImage from './TypeImage'
import TypeTalks from './TypeTalks'
import TypeTldraw from './TypeTldraw'
import TypeVideo from './TypeVideo'

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
  marks: {
    link: MarkLink,
    reference: MarkReference,
  },
  types: {
    break: () => <hr />,
    code: TypeCode,
    image: TypeImage,
    tldraw: TypeTldraw,
    talks: TypeTalks,
    video: TypeVideo,
    gallery: TypeGallery,
    codeSandbox: TypeCodeSandbox,
    button: TypeButton,
  },
}
