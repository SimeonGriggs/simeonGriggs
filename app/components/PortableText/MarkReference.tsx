import type {PortableTextMarkComponentProps} from '@portabletext/react'
import {Link} from '@remix-run/react'
import React from 'react'
import {z} from 'zod'

import {baseTypedObjectZ} from '~/types/block'

export const typedObjectReferenceZ = baseTypedObjectZ.extend({
  _type: z.literal('reference'),
  title: z.string().nullable(),
  slug: z.string().nullable(),
})

export type TypedObjectReference = z.infer<typeof typedObjectReferenceZ>

export default function MarkReference(props: PortableTextMarkComponentProps<TypedObjectReference>) {
  const {value, children} = props

  if (!value?.slug) {
    return <>{children}</>
  }

  return (
    <Link title={value.title ?? ``} to={`/${value.slug}`}>
      {children}
    </Link>
  )
}
