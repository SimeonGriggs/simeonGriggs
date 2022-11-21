import imageUrlBuilder from '@sanity/image-url'
import React, {useState, useEffect, useCallback} from 'react'
import type {RouteMatch} from '@remix-run/react'
import {useLocation, useMatches} from '@remix-run/react'
import {motion} from 'framer-motion'
import {useWindowSize} from 'usehooks-ts'
import {Blurhash} from 'react-blurhash'
import type {SanityImageSource} from '@sanity/asset-utils'
import {z} from 'zod'

import type {ArticleStub, ExchangeStub} from '~/types/stubs'
import {articleStubZ} from '~/types/stubs'
import {projectDetails} from '~/sanity/projectDetails'
import type {BannerSize} from './getNewBannerSize'
import {getNewBannerSize} from './getNewBannerSize'

const bannerConfigMobile: BannerConfig = {
  key: `mobile`,
  width: 1200,
  height: 250,
  className: `block md:hidden`,
}

const bannerConfigDesktop: BannerConfig = {
  key: `desktop`,
  width: 800,
  height: 1400,
  className: `hidden md:block`,
}

const bannerConfigZ = z.object({
  key: z.union([z.literal(`mobile`), z.literal(`desktop`)]),
  width: z.number(),
  height: z.number(),
  className: z.string(),
})

type BannerConfig = z.infer<typeof bannerConfigZ>

const Banner = () => {
  const {pathname} = useLocation()
  const isHome = pathname === '/'
  const matches = useMatches()
  const {width: windowWidth} = useWindowSize()
  const [bannerSize, setBannerSize] = useState<BannerSize>(getNewBannerSize(isHome, windowWidth))

  const updateBannerSize = useCallback(() => {
    if (!windowWidth) return

    const newSize = getNewBannerSize(isHome, windowWidth)

    if (newSize) {
      setBannerSize(newSize)
    }
  }, [isHome, windowWidth])

  const bannerImage = React.useMemo<(SanityImageSource & {altText: string}) | null>(() => {
    const thisPathData = matches.find((match: RouteMatch) =>
      pathname === `/` ? match.id === `routes/index` : match.pathname === pathname
    )

    if (!thisPathData?.data) {
      return null
    }

    if (thisPathData?.data?.article?.image) {
      return thisPathData.data.article.image
    }

    const firstBlogPostWithImage = articleStubZ.parse(
      thisPathData.data.articles.find(
        (b: ExchangeStub | ArticleStub) => b.source === 'blog' && b.image
      )
    )

    return firstBlogPostWithImage?.image ? firstBlogPostWithImage.image : null
  }, [matches, pathname])

  // Update banner size on resize
  useEffect(() => {
    if (typeof document !== 'undefined') {
      window.addEventListener('resize', updateBannerSize)
    }

    return () => window.removeEventListener('resize', updateBannerSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update banner size when path changes
  useEffect(() => {
    updateBannerSize()
  }, [pathname, windowWidth, updateBannerSize])

  return (
    <>
      {bannerImage ? (
        <div
          data-banner="mobile"
          className={`pointer-events-none top-0 z-10 h-32 w-screen origin-top-left md:hidden ${
            isHome ? `fixed` : `absolute`
          }`}
        >
          <img
            loading="eager"
            src={imageUrlBuilder(projectDetails())
              .image(bannerImage)
              .height(bannerConfigMobile.height)
              .width(bannerConfigMobile.width)
              .auto('format')
              .quality(80)
              .toString()}
            alt={bannerImage?.altText ? String(bannerImage.altText) : ``}
            className={`${bannerConfigMobile.className} absolute inset-0 block h-full object-cover md:min-h-screen`}
            height={bannerConfigMobile.height}
            width={bannerConfigMobile.width}
          />
        </div>
      ) : null}
      {bannerSize.wrapper ? (
        <motion.div
          initial={{...bannerSize.wrapper, opacity: 0}}
          animate={{...bannerSize.wrapper, opacity: bannerSize.size === 'mobile' ? 0 : 1}}
          transition={{duration: 0.33}}
          className={`pointer-events-none top-0 z-10 h-32 w-screen origin-top-left opacity-0 md:h-screen ${
            isHome ? `fixed` : `absolute md:fixed`
          }`}
        >
          {/* All-nonsense image on desktop */}
          {bannerImage && (
            <motion.div
              className="absolute inset-0 h-32 bg-blue-500 md:right-auto md:h-screen md:w-4/12 lg:w-6/16"
              initial={{opacity: 1, ...bannerSize.image}}
              animate={{opacity: 1, ...bannerSize.image}}
              exit={{opacity: 0, ...bannerSize.image}}
              transition={{duration: 0.33}}
            >
              <div>
                {/* TypeScript????!!! */}
                {typeof bannerImage !== 'string' &&
                  'asset' in bannerImage &&
                  'metadata' in bannerImage.asset &&
                  bannerImage?.asset?.metadata?.blurHash && (
                    <div
                      className={`${bannerConfigDesktop.className} max-w-screen absolute inset-0 overflow-hidden object-cover`}
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
                      alt={bannerImage?.altText ? String(bannerImage.altText) : ``}
                      className={`${bannerConfigDesktop.className} absolute inset-0 h-full object-cover md:min-h-screen`}
                      height={bannerConfigDesktop.height}
                      width={bannerConfigDesktop.width}
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{duration: 0.33}}
                      exit={{opacity: 0}}
                    />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </>
  )
}

export default Banner
