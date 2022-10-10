import BlockHeading from './BlockHeading'
import TypeCode from './TypeCode'
import TypeImage from './TypeImage'

export const components = {
  block: {
    h2: BlockHeading,
    h3: BlockHeading,
  },
  types: {
    break: () => <hr />,
    code: TypeCode,
    image: TypeImage,
  },
}
