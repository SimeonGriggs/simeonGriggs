import {useEffect} from 'react'
import {useLocation, useRouteLoaderData} from 'react-router'
import {useWindowSize} from 'usehooks-ts'

import type {loader as homeLoader} from '~/routes/_website._index'
import type {loader as pageLoader} from '~/routes/_website.$slug'
import type {ArticleStub} from '~/types/stubs'
import {articleStubZ} from '~/types/stubs'

import {Desktop} from './Desktop'
import {getNewBannerSize} from './getNewBannerSize'
import {Mobile} from './Mobile'

export function Banner() {
  const {pathname} = useLocation()
  const isHome = pathname === '/'
  const homeData = useRouteLoaderData<typeof homeLoader>('routes/_website._index')
  const pageData = useRouteLoaderData<typeof pageLoader>('routes/_website.$slug')

  let bannerImage: ArticleStub['image'] = null

  if (isHome && homeData) {
    const firstBlogPostWithImage = articleStubZ.parse(
      homeData.initial.data.find((b: ArticleStub) => b.image && b.published),
    )

    bannerImage = firstBlogPostWithImage?.image ? firstBlogPostWithImage.image : null
  } else if (pageData) {
    bannerImage = pageData?.initial?.data?.image ? pageData.initial.data.image : null
  }

  const {width: windowWidth} = useWindowSize()
  let bannerSize = getNewBannerSize(isHome, windowWidth)

  const updateBannerSize = () => {
    bannerSize = getNewBannerSize(isHome, windowWidth)
  }

  // Update banner size on resize
  useEffect(() => {
    window.addEventListener('resize', updateBannerSize)

    return () => window.removeEventListener('resize', updateBannerSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update banner size when path changes
  useEffect(() => {
    updateBannerSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!bannerImage) {
    return null
  }

  const alt = bannerImage?.asset?.altText ? bannerImage.asset.altText : ``

  return (
    <>
      {/* No-nonsense mobile image */}
      <Mobile isHome={isHome} bannerImage={bannerImage} alt={alt} />

      {/* All-nonsense image on desktop */}
      <Desktop isHome={isHome} bannerImage={bannerImage} bannerSize={bannerSize} alt={alt} />
    </>
  )
}
