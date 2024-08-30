import type {PortableTextTypeComponentProps} from '@portabletext/react'
import {stegaClean} from '@sanity/client/stega'
import {useMemo} from 'react'
import {TldrawImage} from 'tldraw'
import {z} from 'zod'

import {baseTypedObjectZ} from '~/types/block'

export const typedObjectTldrawZ = baseTypedObjectZ.extend({
  _type: z.literal('tldraw'),
  document: z.string().nullable(),
})

export type TypedObjectTldraw = z.infer<typeof typedObjectTldrawZ>

export default function TypeTldraw(props: PortableTextTypeComponentProps<TypedObjectTldraw>) {
  const value = useMemo(() => typedObjectTldrawZ.parse(props.value), [props.value])

  if (!value?.document) {
    return null
  }

  return (
    <div className="not-prose relative -mx-4 border-b border-t border-gray-200 dark:border-blue-700 md:border">
      <TldrawImage snapshot={JSON.parse(stegaClean(value.document))} />
    </div>
  )
}
