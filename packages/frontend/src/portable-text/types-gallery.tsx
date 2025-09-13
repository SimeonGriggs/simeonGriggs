import type {PortableTextTypeComponentProps} from '@portabletext/react'
import {image} from '../image'

type TypeGalleryValue = {
  images: {
    _id: string
    url: string
    alt: string
    description: string
  }[]
}

export function TypeGallery(
  props: PortableTextTypeComponentProps<TypeGalleryValue>,
) {
  const {images = []} = props.value

  return (
    <>
      {images.map((photo) => (
        <p key={photo._id} className="my-10 text-base/8 first:mt-0 last:mb-0">
          {photo.url ? (
            <a href={`${photo.url}?dl=1`} title="Click to Download">
              <img
                alt={photo.alt || ''}
                src={image(photo).width(1000).url()}
                className="w-full rounded-2xl"
              />
            </a>
          ) : (
            <img
              alt={photo.alt || ''}
              src={image(photo).width(1000).url()}
              className="w-full rounded-2xl"
            />
          )}

          {photo?.description ? (
            <small className="block px-4 text-center opacity-75">
              {photo.description}
            </small>
          ) : null}
        </p>
      ))}
    </>
  )
}
