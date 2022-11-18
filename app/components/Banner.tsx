import React, {useState, useEffect, useCallback} from 'react'
import type {RouteMatch} from '@remix-run/react'
import {useLocation, useMatches} from '@remix-run/react'
import {motion} from 'framer-motion'
import {useWindowSize} from 'usehooks-ts'
import {Blurhash} from 'react-blurhash'
import type {SanityImageSource} from '@sanity/asset-utils'
import {z} from 'zod'

import {clipPathInset} from '~/lib/utils/helpers'
import {urlFor} from '~/sanity/helpers'
import type {ArticleStub, ExchangeStub} from '~/types/stubs'
import {articleStubZ} from '~/types/stubs'

type BannerSizeImage = {
  scale: number
  x: number
}

type BannerSizeWrapper = {
  clipPath: string
}

type BannerSize = {
  image?: BannerSizeImage
  wrapper?: BannerSizeWrapper
}

function getNewBannerSize(useHomeSize = false, windowWidth = 0) {
  if (!windowWidth && typeof document === 'undefined') return null

  const width = windowWidth ?? window.innerWidth

  // Double check, if no prop was given we should double check
  const checkHomeSize =
    typeof document !== 'undefined' && typeof useHomeSize === 'undefined'
      ? window.location.pathname === '/'
      : useHomeSize

  const bannerHomeMobile = {
    wrapper: {clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`},
    image: {scale: 1, x: 0},
  }

  const bannerPostMobile = {
    wrapper: {clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`},
    image: {scale: 1, x: 0},
  }

  const bannerHomeTablet = {
    wrapper: {clipPath: `polygon(${clipPathInset(12, 1, 4, 1)})`},
    image: {scale: (1 / 12) * 10, x: `${(100 / 12) * 2}%`},
  }

  const bannerPostTablet = {
    wrapper: {clipPath: `polygon(${clipPathInset(12, 0, 1, 0)})`},
    image: {scale: 1, x: `-10%`},
  }

  const bannerHomeDesktop = {
    wrapper: {clipPath: `polygon(${clipPathInset(16, 1, 6, 1)})`},
    image: {scale: (1 / 16) * 15, x: `${(100 / 16) * 2}%`},
  }

  const bannerPostDesktop = {
    wrapper: {clipPath: `polygon(${clipPathInset(16, 0, 3, 0)})`},
    image: {scale: 1, x: `-20%`},
  }

  let newBannerSize = {}

  switch (true) {
    case width >= 768 && width < 1024:
      newBannerSize = checkHomeSize ? bannerHomeTablet : bannerPostTablet
      break
    case width >= 1024:
      newBannerSize = checkHomeSize ? bannerHomeDesktop : bannerPostDesktop
      break
    default:
      newBannerSize = checkHomeSize ? bannerHomeMobile : bannerPostMobile
      break
  }

  return newBannerSize
}

const bannerConfigs: BannerConfig[] = [
  {
    key: `mobile`,
    width: 1200,
    height: 250,
    className: `block md:hidden`,
  },
  {
    key: `desktop`,
    width: 800,
    height: 1400,
    className: `hidden md:block`,
  },
]

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
  const [bannerSize, setBannerSize] = useState<BannerSize>({})

  const {width: windowWidth} = useWindowSize()

  const updateBannerSize = useCallback(() => {
    if (!windowWidth) return

    const newSize = getNewBannerSize(isHome, windowWidth)

    if (newSize) {
      setBannerSize(newSize)
    }
  }, [isHome, windowWidth])

  const bannerImage = React.useMemo<SanityImageSource | null>(() => {
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

  return bannerSize.wrapper ? (
    <motion.div
      initial={{...bannerSize.wrapper, opacity: 0}}
      animate={{...bannerSize.wrapper, opacity: 1}}
      transition={{duration: 0.33}}
      className={`pointer-events-none top-0 z-10 h-32 w-screen origin-top-left opacity-0 md:h-screen ${
        isHome ? `fixed` : `absolute md:fixed`
      }`}
    >
      {bannerImage && (
        <motion.div
          className="absolute inset-0 h-32 bg-blue-500 md:right-auto md:h-screen md:w-4/12 lg:w-6/16"
          initial={{opacity: 1, ...bannerSize.image}}
          animate={{opacity: 1, ...bannerSize.image}}
          exit={{opacity: 0, ...bannerSize.image}}
          transition={{duration: 0.33}}
        >
          {bannerImage && (
            <div>
              {bannerConfigs.map((banner) => (
                <div key={banner.key}>
                  {/* TypeScript????!!! */}
                  {typeof bannerImage !== 'string' &&
                    'asset' in bannerImage &&
                    'metadata' in bannerImage.asset &&
                    bannerImage?.asset?.metadata?.blurHash && (
                      <div
                        className={`${banner.className} max-w-screen absolute inset-0 overflow-hidden object-cover`}
                      >
                        <Blurhash
                          hash={bannerImage.asset.metadata.blurHash}
                          width={banner.width}
                          height={banner.height}
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
                        key={[banner.key, JSON.stringify(bannerImage.asset)].join('-')}
                        src={urlFor(bannerImage)
                          .height(banner.height)
                          .width(banner.width)
                          .auto('format')
                          .toString()}
                        alt={bannerImage?.altText ? String(bannerImage.altText) : ``}
                        className={`${banner.className} absolute inset-0 h-full object-cover md:min-h-screen`}
                        height={banner.height}
                        width={banner.width}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.33}}
                        exit={{opacity: 0}}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  ) : null
}

export default Banner
