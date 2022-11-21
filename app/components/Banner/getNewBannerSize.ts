import {clipPathInset} from '~/lib/utils/helpers'

export type BannerSizeImage = {
  scale: number
  x: number | string
}

export type BannerSizeWrapper = {
  clipPath: string
}

export type BannerSize = {
  size: 'mobile' | 'tablet' | 'desktop'
  image: BannerSizeImage
  wrapper: BannerSizeWrapper
}

const bannerHomeMobile = {
  size: 'mobile' as const,
  wrapper: {clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`},
  image: {scale: 1, x: 0},
}

const bannerPostMobile = {
  size: 'mobile' as const,
  wrapper: {clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`},
  image: {scale: 1, x: 0},
}

const bannerHomeTablet = {
  size: 'tablet' as const,
  wrapper: {clipPath: `polygon(${clipPathInset(12, 1, 4, 1)})`},
  image: {scale: (1 / 12) * 10, x: `${(100 / 12) * 2}%`},
}

const bannerPostTablet = {
  size: 'tablet' as const,
  wrapper: {clipPath: `polygon(${clipPathInset(12, 0, 1, 0)})`},
  image: {scale: 1, x: `-10%`},
}

const bannerHomeDesktop = {
  size: 'desktop' as const,
  wrapper: {clipPath: `polygon(${clipPathInset(16, 1, 6, 1)})`},
  image: {scale: (1 / 16) * 15, x: `${(100 / 16) * 2}%`},
}

const bannerPostDesktop = {
  size: 'desktop' as const,
  wrapper: {clipPath: `polygon(${clipPathInset(16, 0, 3, 0)})`},
  image: {scale: 1, x: `-20%`},
}

export function getNewBannerSize(useHomeSize = false, windowWidth = 0): BannerSize {
  const width = windowWidth ?? window.innerWidth

  switch (true) {
    case width >= 768 && width < 1024:
      return useHomeSize ? bannerHomeTablet : bannerPostTablet
    case width >= 1024:
      return useHomeSize ? bannerHomeDesktop : bannerPostDesktop
    default:
      return useHomeSize ? bannerHomeMobile : bannerPostMobile
  }
}
