import type {PortableTextTypeComponentProps} from '@portabletext/react'
import React from 'react'
import {z} from 'zod'

import {baseTypedObjectZ} from '~/types/block'
import {sanityImageZ} from '~/types/image'

import SanityImage from '../SanityImage'

export const typedObjectGalleryZ = baseTypedObjectZ.extend({
  _type: z.literal('gallery'),
  images: z
    .array(
      sanityImageZ.extend({
        url: z.string().url(),
      })
    )
    .nullable(),
})

export type TypedObjectGallery = z.infer<typeof typedObjectGalleryZ>

export default function TypeGallery(props: PortableTextTypeComponentProps<TypedObjectGallery>) {
  // Now we still get Zod's strict parsing on this specific TypedObject
  const {images} = React.useMemo(() => typedObjectGalleryZ.parse(props.value), [props.value])

  if (!images?.length) {
    return null
  }

  return (
    <div className="prose prose-blue my-4 dark:prose-dark md:prose-lg md:my-8">
      {images.map((photo) => (
        <p key={photo._id} className="-mx-4">
          {photo.url ? (
            <a href={`${photo.url}?dl=1`} title="Click to Download">
              <SanityImage asset={photo} />
            </a>
          ) : (
            <SanityImage asset={photo} />
          )}

          {photo?.description ? (
            <small className="block px-4 text-center opacity-75">{photo.description}</small>
          ) : null}
        </p>
      ))}
    </div>
  )
}
