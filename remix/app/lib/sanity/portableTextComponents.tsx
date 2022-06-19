/* eslint-disable react/display-name */

import {ReactNode} from 'react'
import {ExtendedImageAsset} from './types'
import Prism from '~/components/Prism'
import CommentableBlock from '~/components/Comments/CommentableBlock'
import BlockHeader from '~/components/PortableText/BlockHeader'
import TypeImage from '~/components/PortableText/TypeImage'
import TypeVideo from '~/components/PortableText/TypeVideo'
import TypeButton from '~/components/PortableText/TypeButton'
import TypeCode from '~/components/PortableText/TypeCode'
import TypeCodeSandbox from '~/components/PortableText/TypeCodeSandbox'
import TypeGallery from '~/components/PortableText/TypeGallery'
import TypeTalks from '~/components/PortableText/TypeTalks'
import MarkLink from '~/components/PortableText/MarkLink'

export const portableTextComponents = (comments: boolean) => ({
  container: ({children}: {children: ReactNode}) => children,
  block: {
    h2: BlockHeader,
    h3: BlockHeader,
    code: ({children}: {children: any}) => (
      <Prism code={children?.length > 0 ? children.join(' ') : ``} />
    ),
    pre: ({children}: {children: any}) => (
      <Prism code={children?.length > 0 ? children.join(' ') : ``} />
    ),
    ...(comments ? {normal: CommentableBlock} : {}),
  },
  marks: {
    link: MarkLink,
  },
  types: {
    break: () => <hr />,
    video: TypeVideo,
    image: ({value}: {value: ExtendedImageAsset}) => (
      <p className="-mx-4 border-gray-200 dark:border-blue-700 md:border">
        <TypeImage value={value} />
      </p>
    ),
    talks: TypeTalks,
    gallery: TypeGallery,
    code: TypeCode,
    codeSandbox: TypeCodeSandbox,
    button: TypeButton,
  },
})
