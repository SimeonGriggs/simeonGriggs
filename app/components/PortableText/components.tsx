import TypeCode from './TypeCode'
import TypeImage from './TypeImage'

export const components = {
  block: {
    // h2: (value) => <div>{value}</div>,
    // h2: ({children}) => <h2>{children}</h2>,
    // h3: ({children}) => <h3>{children}</h3>,
  },
  types: {
    break: () => <hr />,
    code: TypeCode,
    image: TypeImage,
  },
}
