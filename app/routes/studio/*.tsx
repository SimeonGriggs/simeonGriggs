import type {LinksFunction, MetaFunction} from '@remix-run/node'
import {Suspense, lazy} from 'react'

import styles from '~/styles/studio.css'

export const meta: MetaFunction = () => ({
  title: 'Sanity Studio',
  robots: 'noindex',
})

export const links: LinksFunction = () => {
  return [
    {rel: 'preload', href: styles, as: 'style'},
    {rel: 'stylesheet', href: styles},
  ]
}

const StudioWrapper = lazy(() => import('~/components/StudioWrapper'))
const Fallback = (
  <div className="flex h-screen w-screen items-center justify-center">Loading...</div>
)

export default function StudioPage() {
  return (
    <Suspense fallback={Fallback}>
      <StudioWrapper />
    </Suspense>
  )
}
