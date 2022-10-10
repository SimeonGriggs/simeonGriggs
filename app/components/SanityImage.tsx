import React, {useMemo} from 'react'
import type {SanityImageSource} from '@sanity/asset-utils'
import {getImageDimensions} from '@sanity/asset-utils'

import {urlFor} from '~/sanity/helpers'

type CreateSrcsetStringConfig = {
  asset: SanityImageSource
  width: number
  height: number
  aspectRatio: number
}

const WIDTHS = [300, 768, 1024, 1536, 2048]

function createSrcsetString(config: CreateSrcsetStringConfig) {
  const {asset, aspectRatio} = config

  const sizes = WIDTHS
    // for every preset width larger than the supplied width
    .filter((w) => w <= config.width)
    // Create a new URL
    .map((width) => {
      const height = Number((width / aspectRatio).toFixed(0))

      return [urlFor(asset).width(width).height(height).dpr(2).toString(), `${width}px`].join(` `)
    })

  return sizes.join(`, `)
}

type SanityImageProps = {
  asset: SanityImageSource
  alt?: string
  width?: number
  height?: number
}

export default function SanityImage(props: SanityImageProps) {
  const {asset} = props

  // This is a mess :/
  // It's designed to set a width and height, even if only one are supplied
  const {width, height, url, srcset} = useMemo(() => {
    const {width: originalWidth, height: originalHeight, aspectRatio} = getImageDimensions(asset)

    let width = originalWidth
    let height = originalHeight

    if (props.width && props.height) {
      // Both width and height were supplied, use those
      width = props.width
      height = props.height
    } else if (!props.width && !props.height) {
      // If neither height or width were supplied, return maximum width and calculated height
      width = WIDTHS[WIDTHS.length - 1]
      height = Number((width / aspectRatio).toFixed(0))
    } else if (props.width && !props.height) {
      // Only width, calculate height
      width = props.width
      height = Number((width / aspectRatio).toFixed(0))
    } else if (!props.width && props.height) {
      // Only height, calculate width
      height = props.height
      width = Number((height * aspectRatio).toFixed(0))
    }

    return {
      width,
      height,
      url: urlFor(asset).width(width).height(height).dpr(2).toString(),
      srcset: createSrcsetString({asset, width, height, aspectRatio}),
    }
  }, [asset, props.width, props.height])

  return (
    <img
      src={url}
      loading="lazy"
      alt={props.alt ?? ``}
      width={width}
      height={height}
      sizes={`(max-width: ${width}px) 100vw, ${width}px`}
      srcSet={srcset}
    />
  )
}
