import {getImageDimensions} from '@sanity/asset-utils'
import {urlFor} from '~/lib/sanity/helpers'
import {ExtendedImageAsset} from '~/lib/sanity/types'

interface TypeImageProps {
  value: ExtendedImageAsset
  width?: number
}

export default function TypeImage(props: TypeImageProps) {
  const {value, width = 800} = props
  const {width: originalWidth, height: originalHeight} = getImageDimensions(value)

  return (
    <img
      loading="lazy"
      src={urlFor(value).width(width).dpr(2).toString()}
      alt={value?.asset?.altText}
      className="h-auto max-w-full"
      width={width}
      height={Math.floor(width * (originalWidth / originalHeight))}
    />
  )
}
