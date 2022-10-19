import React from 'react'
import {z} from 'zod'
import type {PortableTextTypeComponentProps} from '@portabletext/react'

import {baseTypedObjectZ} from '~/types/block'
import Button from '~/components/Button'

export const typedObjectButtonZ = baseTypedObjectZ.extend({
  _type: z.literal('button'),
  link: z
    .object({
      link: z.string().url().nullable(),
      text: z.string().nullable(),
    })
    .nullable(),
})

export type TypedObjectButton = z.infer<typeof typedObjectButtonZ>

export default function TypeButton(props: PortableTextTypeComponentProps<TypedObjectButton>) {
  // Now we still get Zod's strict parsing on this specific TypedObject
  const value = React.useMemo(() => typedObjectButtonZ.parse(props.value), [props.value])

  if (!value) return null

  const {link, text} = value?.link ?? {}

  if (!text) return null

  if (!link) {
    return <>{text ?? ``}</>
  }

  return <Button href={link}>{text}</Button>
}
