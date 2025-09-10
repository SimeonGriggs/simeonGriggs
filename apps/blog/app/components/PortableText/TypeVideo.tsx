import type {PortableTextTypeComponentProps} from '@portabletext/react'
import React from 'react'
import {z} from 'zod'

import {baseTypedObjectZ} from '~/types/block'

import Video from '../Video'

export const typedObjectVideoZ = baseTypedObjectZ.extend({
  _type: z.literal('video'),
  url: z.string().url().nullable(),
  title: z.string().nullable(),
})

export type TypedObjectVideo = z.infer<typeof typedObjectVideoZ>

export default function TypeVideo(props: PortableTextTypeComponentProps<TypedObjectVideo>) {
  // Now we still get Zod's strict parsing on this specific TypedObject
  const {url, title} = React.useMemo(() => typedObjectVideoZ.parse(props.value), [props.value])

  if (!url) {
    return null
  }

  return <Video url={url} title={title ?? ``} />
}
