import type {PortableTextTypeComponentProps} from '@portabletext/react'
import React, {useMemo} from 'react'
import {z} from 'zod'

import SanityImage from '~/components/SanityImage'
import {baseTypedObjectZ} from '~/types/block'
import {sanityImageObjectExtendedZ} from '~/types/image'

export const typedObjectImageZ = baseTypedObjectZ
  .extend({
    _type: z.literal('image'),
  })
  .merge(sanityImageObjectExtendedZ)

export type TypedObjectImage = z.infer<typeof typedObjectImageZ>

export default function TypeImage(props: PortableTextTypeComponentProps<TypedObjectImage>) {
  const value = useMemo(() => typedObjectImageZ.parse(props.value), [props.value])

  return (
    <p className="not-prose relative -mx-4 border-b border-t border-gray-200 dark:border-blue-700 md:border">
      {value?.asset ? (
        <SanityImage asset={value.asset} width={800} alt={value?.asset?.altText || ''} />
      ) : null}
    </p>
  )
}
