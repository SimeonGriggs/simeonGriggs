import React, {useState, useEffect, useCallback} from 'react'
import {useMatches} from '@remix-run/react'
import {useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'
import {useWindowSize} from 'usehooks-ts'
import {Blurhash} from 'react-blurhash'

import {clipPathInset} from '../lib/utils/helpers'
import {urlFor} from '~/lib/sanity/helpers'
import {ArticleDocument, ExtendedImageAsset} from '~/lib/sanity/types'

interface BannerSizeImage {
  scale: number
  x: number
}

interface BannerSizeWrapper {
  clipPath: string
}

interface BannerSize {
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

const banners = [
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

let firstRender = true
let firstAnimation = true

const Banner = () => {
  const {pathname} = useLocation()
  const isHome = pathname === '/'
  const matches = useMatches()
  const [bannerSize, setBannerSize]: [BannerSize, any] = useState({})
  const [bannerImage, setBannerImage]: [ExtendedImageAsset | null, any] = useState(null)
  const [showBanner, setShowBanner] = useState({desktop: false, mobile: false})
  const {width: windowWidth} = useWindowSize()

  const updateBannerSize = useCallback(() => {
    if (!windowWidth) return

    const newSize = getNewBannerSize(isHome, windowWidth)

    if (newSize) {
      setBannerSize(newSize)
    }
  }, [isHome, windowWidth])

  if (firstRender) {
    updateBannerSize()
    firstRender = false
  }

  // Set initial banner
  useEffect(() => {
    if (matches.length) {
      const thisPathData = matches.find((match: any) =>
        pathname === '/' ? match.handle === 'home' : match.handle === 'article'
      )?.data

      if (thisPathData) {
        const image: ExtendedImageAsset =
          pathname === '/'
            ? thisPathData?.articles.find((article: ArticleDocument) => article.image).image
            : thisPathData?.initialData[0]?.image

        if (image) {
          setBannerImage(image)
        }
      }
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, windowWidth])

  return (
    <motion.div
      initial={{...bannerSize.wrapper, opacity: 0}}
      animate={{...bannerSize.wrapper, opacity: 1}}
      transition={{duration: firstAnimation ? 0 : 0.33}}
      onAnimationComplete={() => {
        if (firstAnimation) firstAnimation = false
      }}
      className={`pointer-events-none z-10 h-32 w-screen origin-top-left bg-red-500 opacity-0 md:h-screen ${
        isHome ? `fixed` : `absolute md:fixed`
      }`}
    >
      {bannerImage && (
        <motion.div
          className="lg:w-6/16 absolute inset-0 h-32 bg-blue-500 md:right-auto md:h-screen md:w-4/12"
          initial={{opacity: 0, ...bannerSize.image}}
          animate={{opacity: 1, ...bannerSize.image}}
          exit={{opacity: 0, ...bannerSize.image}}
          transition={{duration: firstAnimation ? 0 : 0.33}}
        >
          {bannerImage && (
            <div>
              {banners.map((banner) => (
                <div key={banner.key}>
                  {bannerImage?.asset?.metadata?.blurHash && (
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
                  <motion.img
                    loading="lazy"
                    key={[banner.key, bannerImage?.asset?._id].join('-')}
                    src={urlFor(bannerImage).height(banner.height).width(banner.width).toString()}
                    alt={bannerImage?.altText ?? ``}
                    className={`${banner.className} absolute inset-0 h-full object-cover md:min-h-screen`}
                    height={banner.height}
                    width={banner.width}
                    initial={{opacity: 0}}
                    animate={{opacity: showBanner?.[banner.key] ? 1 : 0}}
                    transition={{duration: firstAnimation ? 0 : 0.33}}
                    exit={{opacity: 0}}
                    onLoad={() => setShowBanner({...showBanner, [banner.key]: true})}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Banner
