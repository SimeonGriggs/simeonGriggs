import BlockHeading from './BlockHeading'
import MarkLink from './MarkLink'
import TypeCode from './TypeCode'
import TypeGallery from './TypeGallery'
import TypeImage from './TypeImage'
import TypeTalks from './TypeTalks'
import TypeVideo from './TypeVideo'

export const components = {
  block: {
    h2: BlockHeading,
    h3: BlockHeading,
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
