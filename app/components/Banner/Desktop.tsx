import imageUrlBuilder from '@sanity/image-url'
import {clsx} from 'clsx'
import {motion} from 'framer-motion'
import type {PropsWithChildren} from 'react'
import {Blurhash} from 'react-blurhash'
import {z} from 'zod'

import {projectDetails} from '~/sanity/projectDetails'

import type {BannerSize} from './getNewBannerSize'

const bannerConfigZ = z.object({
  key: z.union([z.literal(`mobile`), z.literal(`desktop`)]),
  width: z.number(),
  height: z.number(),
  className: z.string(),
})

type BannerConfig = z.infer<typeof bannerConfigZ>

const bannerConfigDesktop: BannerConfig = {
  key: `desktop`,
  width: 800,
  height: 1400,
  className: `hidden md:block`,
}

type DesktopProps = PropsWithChildren<{
  isHome: boolean
  bannerImage: any
  bannerSize: BannerSize
  alt: string
}>

export function Desktop(props: DesktopProps) {
  const {isHome, bannerImage, bannerSize, alt} = props

  return (
    <motion.div
      initial={{opacity: 1, ...bannerSize.wrapper}}
      animate={{opacity: 1, ...bannerSize.wrapper}}
      exit={{opacity: 0, ...bannerSize.wrapper}}
      transition={{duration: 0.33}}
      className={clsx(
        `pointer-events-none top-0 z-10 w-screen origin-top-left hidden md:block h-screen`,
        isHome ? `fixed` : `fixed`,
      )}
    >
      <motion.div
        className="absolute inset-0 h-32 bg-blue-500 md:right-auto md:h-screen md:w-4/12 lg:w-6/16"
        initial={{opacity: 1, ...bannerSize.image}}
        animate={{opacity: 1, ...bannerSize.image}}
        exit={{opacity: 0, ...bannerSize.image}}
        transition={{duration: 0.33}}
      >
        {/* TypeScript????!!! */}
        {typeof bannerImage !== 'string' &&
          'asset' in bannerImage &&
          'metadata' in bannerImage.asset &&
          bannerImage?.asset?.metadata?.blurHash && (
            <div
              className={clsx(
                bannerConfigDesktop.className,
                `max-w-screen absolute inset-0 overflow-hidden object-cover`,
              )}
            >
              <Blurhash
                hash={bannerImage.asset.metadata.blurHash}
                width={bannerConfigDesktop.width}
                height={bannerConfigDesktop.height}
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            </div>
          )}
        {typeof bannerImage !== 'string' && 'asset' in bannerImage && (
          <>
            <motion.img
              loading="eager"
              key={[bannerConfigDesktop.key, JSON.stringify(bannerImage.asset)].join('-')}
              src={imageUrlBuilder(projectDetails())
                .image(bannerImage)
                .height(bannerConfigDesktop.height)
                .width(bannerConfigDesktop.width)
                .auto('format')
                .quality(80)
                .toString()}
              alt={alt}
              className={clsx(
                bannerConfigDesktop.className,
                `absolute inset-0 h-full object-cover md:min-h-screen`,
              )}
              height={bannerConfigDesktop.height}
              width={bannerConfigDesktop.width}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.33}}
              exit={{opacity: 0}}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
