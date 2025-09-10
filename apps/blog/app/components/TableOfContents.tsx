import {PortableText} from '@portabletext/react'

import type {TypedObjectBlock} from '~/types/block'

import Label from './Label'
import {tocComponents} from './PortableText/components'

type TableOfContentsProps = {
  value: TypedObjectBlock[]
}

export default function TableOfContents(props: TableOfContentsProps) {
  const {value} = props

  return (
    <>
      <ul className="sticky top-12 grid grid-cols-1 gap-y-4 font-mono text-xs lg:pr-12">
        <Label as="li">Table of Contents</Label>
        <PortableText value={value} components={tocComponents} />
      </ul>
    </>
  )
}
