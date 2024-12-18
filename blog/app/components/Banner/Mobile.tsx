import {clsx} from 'clsx'
import type {PropsWithChildren} from 'react'

import SanityImage from '../SanityImage'
type MobileProps = PropsWithChildren<{
  isHome: boolean
  bannerImage: any
  alt: string
}>

export function Mobile(props: MobileProps) {
  const {isHome, bannerImage, alt} = props

  return (
    <div
      className={clsx(
        `pointer-events-none top-0 z-10 h-32 w-screen origin-top-left md:hidden`,
        isHome ? `fixed` : `absolute`,
      )}
    >
      <SanityImage
        asset={bannerImage}
        width={800}
        height={260}
        loading="eager"
        className="absolute inset-0 block h-full object-cover md:hidden md:min-h-screen"
        alt={alt}
      />
    </div>
  )
}
