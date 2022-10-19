import {PortableText} from '@portabletext/react'
import type {TypedObject} from '@sanity/types'

import {components} from '~/components/PortableText/components'

type IntroProps = {
  value: TypedObject[]
}

const componentsWithoutComments = components
if (componentsWithoutComments?.block?.normal) {
  delete componentsWithoutComments.block.normal
}

export default function Intro(props: IntroProps) {
  const {value} = props

  return (
    <div className="intro -mx-4 grid grid-cols-1 gap-y-4 bg-blue-500 p-4 font-mono text-white md:mx-0 md:p-8 md:text-lg">
      <PortableText value={value} components={componentsWithoutComments} />
    </div>
  )
}
