import type {PortableTextTypeComponentProps} from '@portabletext/react'
import React from 'react'
import {z} from 'zod'

import TalkCard from '~/components/TalkCard'
import {baseTypedObjectZ} from '~/types/block'
import {talkZ} from '~/types/talk'

export const typedObjectTalksZ = baseTypedObjectZ.extend({
  _type: z.literal('talks'),
  talks: z.array(talkZ),
})

export type TypedObjectTalks = z.infer<typeof typedObjectTalksZ>

export default function TypeTalks(props: PortableTextTypeComponentProps<TypedObjectTalks>) {
  // Now we still get Zod's strict parsing on this specific TypedObject
  const {talks} = React.useMemo(() => typedObjectTalksZ.parse(props.value), [props.value])

  if (!talks?.length) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-y-4">
      {talks.map((talk) => (
        <TalkCard key={talk._id} {...talk} />
      ))}
    </div>
  )
}
