import type {PortableTextComponents} from '@portabletext/react'
import BlockHeading from './BlockHeading'
import BlockNormal from './BlockNormal'
import MarkLink from './MarkLink'
import TypeCode from './TypeCode'
import TypeGallery from './TypeGallery'
import TypeImage from './TypeImage'
import TypeTalks from './TypeTalks'
import TypeVideo from './TypeVideo'

export const components: PortableTextComponents = {
  block: {
    h2: BlockHeading,
    h3: BlockHeading,
    normal: BlockNormal,
  },
  marks: {
    link: MarkLink,
  },
  types: {
    break: () => <hr />,
    code: TypeCode,
    image: TypeImage,
    talks: TypeTalks,
    video: TypeVideo,
    gallery: TypeGallery,
  },
}
