import React from 'react'
import {z} from 'zod'
import type {PortableTextTypeComponentProps} from '@portabletext/react'

import {baseTypedObjectZ} from '~/types/block'
import Button from '~/components/Button'
import {slugZ} from '~/types/slug'

export const typedObjectButtonZ = baseTypedObjectZ.extend({
  _type: z.literal('button'),
  link: z
    .object({
      link: z.string().url().nullable().optional(),
      text: z.string().nullable().optional(),
      reference: z
        .object({
          slug: slugZ,
        })
        .nullable(),
    })
    .nullable(),
})

export type TypedObjectButton = z.infer<typeof typedObjectButtonZ>

export default function TypeButton(props: PortableTextTypeComponentProps<TypedObjectButton>) {
  // Now we still get Zod's strict parsing on this specific TypedObject
  const value = React.useMemo(() => typedObjectButtonZ.parse(props.value), [props.value])

  if (!value) return null

  const {link, text, reference} = value?.link ?? {}

  if (!text) {
    return null
  } else if (reference?.slug?.current) {
    return (
      <p className="text-center">
        <Button to={`/${reference.slug.current}`}>{text}</Button>
      </p>
    )
  } else if (link) {
    return (
      <p className="text-center">
        <Button to={link}>{text}</Button>
      </p>
    )
  } else {
    return <p>{text}</p>
  }
}
