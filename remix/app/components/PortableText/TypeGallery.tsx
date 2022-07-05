import TypeImage from './TypeImage'
import {ExtendedImageAsset} from '~/lib/sanity/types'

type TypeGalleryProps = {
  value: {
    images: ExtendedImageAsset[]
  }
}

export default function TypeGallery(props: TypeGalleryProps) {
  const {images} = props?.value ?? {}

  if (!images?.length) {
    return null
  }

  return (
    <div className="prose md:prose-lg dark:prose-dark prose-blue my-4 max-w-none md:my-8">
      {images.map((photo: ExtendedImageAsset) => (
        <p key={photo._id} className="-mx-4">
          {photo.url ? (
            <a
              href={`${photo.url}?dl=1`}
              title="Click to Download"
              className="flex items-center justify-center"
            >
              <TypeImage value={photo} />
            </a>
          ) : (
            <TypeImage value={photo} />
          )}

          {photo?.asset?.description ? (
            <small className="block px-4 text-center opacity-75">{photo.asset.description}</small>
          ) : null}
        </p>
      ))}
    </div>
  )
}
