/* eslint-disable react/display-name */

import Prism from '~/components/Prism'
import CommentableBlock from '~/components/Comments/CommentableBlock'
import BlockHeader from '~/components/PortableText/BlockHeader'
import TypeImage from '~/components/PortableText/TypeImage'
import TypeVideo from '~/components/PortableText/TypeVideo'
import TypeButton from '~/components/PortableText/TypeButton'
import TypeCode from '~/components/PortableText/TypeCode'
import TypeCodeSandbox from '~/components/PortableText/TypeCodeSandbox'

export const portableTextComponents = (comments: boolean) => ({
  container: ({children}: {children: any}) => children,
  block: {
    h2: BlockHeader,
    h3: BlockHeader,
    code: ({children}: {children: any}) => (
      <Prism code={children?.length > 0 ? children.join(' ') : ``} />
    ),
    pre: ({children}: {children: any}) => (
      <Prism code={children?.length > 0 ? children.join(' ') : ``} />
    ),
    normal: comments ? CommentableBlock : undefined,
  },
  types: {
    break: () => <hr />,
    video: TypeVideo,
    image: ({value}) => (
      <p className="-mx-4 border-gray-200 dark:border-blue-700 md:border">
        <TypeImage value={value} />
      </p>
    ),
    code: TypeCode,
    codeSandbox: TypeCodeSandbox,
    button: TypeButton,
  },
})
