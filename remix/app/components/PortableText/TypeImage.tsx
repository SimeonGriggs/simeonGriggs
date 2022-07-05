import {useMemo} from 'react'
import {SanityImageAssetDocument} from '@sanity/client'
import {getImageDimensions} from '@sanity/asset-utils'

import {urlFor} from '~/lib/sanity/helpers'
import {ExtendedImageAsset} from '~/lib/sanity/types'

type CreateSrcsetStringProps = {
  value: ExtendedImageAsset
  width: number
  height: number
  aspectRatio: number
}

const WIDTHS = [300, 768, 1024, 1536, 2048]

function createSrcsetString(config: CreateSrcsetStringProps) {
  const {value, aspectRatio} = config

  const sizes = WIDTHS.map((width) => {
    const height = Number((width / aspectRatio).toFixed(0))

    return [urlFor(value).width(width).height(height).toString(), `${width}px`].join(` `)
  })

  return sizes.join(`, `)
}

type SanityImageProps = {
  value: ExtendedImageAsset
  className?: string
  alt?: string
  width?: number
  height?: number
  preload?: boolean
}

const DEFAULT_PROPS = {
  className: ``,
  alt: ``,
  preload: true,
}

export default function TypeImage(props: SanityImageProps) {
  const {value, className, alt, preload} = {...DEFAULT_PROPS, ...props}

  const {width: originalWidth, height: originalHeight, aspectRatio} = getImageDimensions(value)

  // Scale down the image if the original is larger than the largest predefined width
  const maxWidth = WIDTHS[WIDTHS.length - 1]
  const scaleDown = originalWidth > maxWidth

  const width = props?.width && props?.height ? props.width : scaleDown ? maxWidth : originalWidth
  const height =
    props?.width && props?.height
      ? props.height
      : scaleDown
      ? Number((width / aspectRatio).toFixed(0))
      : originalHeight

  const url = urlFor(value).width(width).height(height).toString()

  const srcset = useMemo(
    () => createSrcsetString({value, width, height, aspectRatio}),
    [value, width, height, aspectRatio]
  )

  if (!url) return null

  return (
    <>
      {/* TODO: Add preload support */}
      {/* {preload && (
          <Head>
          <link rel="preload" as="image" href={url} />
        </Head>
      )} */}
      <img
        src={url}
        loading={preload ? `eager` : `lazy`}
        className={className || ``}
        alt={alt || ``}
        width={width}
        height={height}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
        srcSet={srcset}
      />
    </>
  )
}
