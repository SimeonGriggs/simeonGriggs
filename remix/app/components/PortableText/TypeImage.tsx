import type {SanityImageSource} from '@sanity/asset-utils'
import {getImageDimensions} from '@sanity/asset-utils'
import {urlFor} from '~/lib/sanity/helpers'

interface TypeImageProps {
  value: SanityImageSource & {
    asset: {
      altText: string
    }
  }
}

export default function TypeImage(props: TypeImageProps) {
  const {value} = props
  const {width, height} = getImageDimensions(value)

  return (
    <p className="-mx-4 border-t border-b md:border border-gray-100">
      <img
        loading="lazy"
        src={urlFor(value).width(800).toString()}
        alt={value?.asset?.altText}
        className="w-full h-auto"
        width={800}
        height={800 * (width / height)}
      />
    </p>
  )
}
