import type {SanityImageSource} from '@sanity/asset-utils'
import {getImageDimensions} from '@sanity/asset-utils'
import React, {useMemo} from 'react'

import {urlFor} from '~/sanity/helpers'

type CreateSrcsetStringConfig = {
  asset: SanityImageSource
  width: number
  height: number
}

const WIDTHS = [300, 768, 1024, 1536, 2048]

function createSrcsetString(config: CreateSrcsetStringConfig) {
  const {asset} = config
  const aspectRatio = config.width / config.height

  const sizes = WIDTHS
    // for every preset width larger than the supplied width
    .filter((w) => w <= config.width)
    // Create a new URL
    .map((width) => {
      const height = Number((width / aspectRatio).toFixed(0))

      return [
        urlFor(asset).width(width).height(height).dpr(2).auto('format').toString(),
        `${width}w`,
      ].join(` `)
    })

  return sizes.join(`, `)
}

type SanityImageProps = {
  asset: SanityImageSource
  loading?: 'eager' | 'lazy'
  className?: string
  alt?: string
  width?: number
  height?: number
}

export default function SanityImage(props: SanityImageProps) {
  const {asset, className, loading = 'lazy'} = props

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
      url: urlFor(asset).width(width).height(height).dpr(2).auto('format').toString(),
      srcset: createSrcsetString({asset, width, height}),
    }
  }, [asset, props.width, props.height])

  return (
    <img
      className={className}
      src={url}
      loading={loading}
      alt={props.alt ?? ``}
      width={width}
      height={height}
      sizes={`(max-width: ${width}px) 100vw, ${width}px`}
      srcSet={srcset}
    />
  )
}
