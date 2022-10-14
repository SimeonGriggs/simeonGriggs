import React, {useMemo} from 'react'
import {z} from 'zod'
import type {PortableTextTypeComponentProps} from '@portabletext/react'

import {sanityImageObjectExtendedZ} from '~/types/image'
import SanityImage from '~/components/SanityImage'
import {baseTypedObjectZ} from '~/types/block'

export const typedObjectImageZ = baseTypedObjectZ
  .extend({
    _type: z.literal('image'),
  })
  .merge(sanityImageObjectExtendedZ)

export type TypedObjectImage = z.infer<typeof typedObjectImageZ>

export default function TypeImage(props: PortableTextTypeComponentProps<TypedObjectImage>) {
  const value = useMemo(() => typedObjectImageZ.parse(props.value), [props.value])

  return (
    <p className="not-prose relative -mx-4 border-t border-b border-gray-200 dark:border-blue-700 md:border">
      {value?.asset ? (
        <SanityImage asset={value} width={800} alt={value?.asset?.altText || ''} />
      ) : null}
    </p>
  )
}
