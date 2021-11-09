import React, {useState, useEffect} from 'react'
import {useMatches} from 'remix'
import {useLocation} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'
import {useWindowSize} from 'usehooks-ts'
import {Blurhash} from 'react-blurhash'

import {clipPathInset} from '../lib/helpers'
import sanityImageUrl from '~/lib/sanityImageUrl'

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
  if (!windowWidth && typeof window === 'undefined') return null

  const width = windowWidth ?? window.innerWidth

  // Double check, if no prop was given we should double check
  const checkHomeSize =
    window && typeof useHomeSize === 'undefined' ? window.location.pathname === '/' : useHomeSize

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
    width: 800,
    height: 300,
    className: `block md:hidden`,
  },
  {
    key: `desktop`,
    width: 600,
    height: 1200,
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
  const [bannerImage, setBannerImage] = useState(null)
  const [showBanner, setShowBanner] = useState({desktop: false, mobile: false})
  const {width: windowWidth} = useWindowSize()

  // Set initial banner
  useEffect(() => {
    if (matches.length) {
      const thisPathData = matches.find((match: any) =>
        pathname === '/' ? match.handle === 'home' : match.handle === 'article'
      )?.data

      if (thisPathData) {
        const image =
          pathname === '/' ? thisPathData?.articles[0].image : thisPathData?.initialData?.image

        if (image) {
          setBannerImage(image)
        }
      }
    }
  }, [matches, pathname])

  function updateBannerSize() {
    const newSize = getNewBannerSize(isHome, windowWidth)

    if (newSize) {
      setBannerSize(newSize)
    }
  }

  if (firstRender) {
    updateBannerSize()
    firstRender = false
  }

  // Update banner size on resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => updateBannerSize())
    }

    // return typeof window === 'undefined'
    //   ? null
    //   : window.removeEventListener('resize', updateBannerSize())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update banner size when path changes
  useEffect(() => {
    updateBannerSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, windowWidth])

  if (!windowWidth) return null

  return (
    <motion.div
      initial={{...bannerSize.wrapper, opacity: 0}}
      animate={{...bannerSize.wrapper, opacity: 1}}
      transition={{duration: firstAnimation ? 0 : 0.33}}
      onAnimationComplete={() => {
        if (firstAnimation) firstAnimation = false
      }}
      className={`pointer-events-none h-32 md:h-screen opacity-0 w-screen z-40 origin-top-left ${
        isHome ? `fixed` : `absolute md:fixed`
      }`}
    >
      {bannerImage && (
        <motion.div
          className="absolute inset-0 h-32 md:h-screen md:right-auto md:w-4/12 lg:w-6/16 bg-blue-500"
          initial={{opacity: 0, ...bannerSize.image}}
          animate={{opacity: 1, ...bannerSize.image}}
          exit={{opacity: 0, ...bannerSize.image}}
          transition={{duration: firstAnimation ? 0 : 0.33}}
        >
          {bannerImage && (
            <AnimatePresence>
              {banners.map((banner) => (
                <React.Fragment key={banner.key}>
                  {bannerImage?.asset?.metadata?.blurHash && (
                    <div
                      className={`${banner.className} absolute inset-0 object-cover max-w-screen overflow-hidden`}
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
                    src={sanityImageUrl(bannerImage)
                      .height(banner.height)
                      .width(banner.width)
                      .toString()}
                    alt={bannerImage?.altText ?? ``}
                    className={`${banner.className} absolute inset-0 object-cover`}
                    height={banner.height}
                    width={banner.width}
                    initial={{opacity: 0}}
                    animate={{opacity: showBanner?.[banner.key] ? 1 : 0}}
                    transition={{duration: firstAnimation ? 0 : 0.33}}
                    exit={{opacity: 0}}
                    onLoad={() => setShowBanner({...showBanner, [banner.key]: true})}
                  />
                </React.Fragment>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Banner
