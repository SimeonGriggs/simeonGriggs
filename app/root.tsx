import {PortableTextComponentsProvider} from '@portabletext/react'
import type {LinksFunction, LoaderFunction, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react'

import {projectDetails} from '~/sanity/config'
import Banner from '~/components/Banner'
import Grid from '~/components/Grid'
import Header from '~/components/Header'
import {components} from '~/components/PortableText/components'
import {client} from '~/sanity/client'
import {siteMetaQuery} from '~/sanity/queries'
import type {SiteMeta} from '~/types/siteMeta'
import {siteMetaZ} from '~/types/siteMeta'
import {themePreferenceCookie} from './cookies'

type LoaderData = {
  siteMeta: SiteMeta
  ENV: {[key: string]: string}
  themePreference?: 'dark' | 'light'
}

export const handle = {id: `root`}

export const meta: MetaFunction = ({data}: {data: LoaderData}) => ({
  charset: 'utf-8',
  title: 'New Remix + Sanity Studio v3 App',
  viewport: 'width=device-width,initial-scale=1',
  'theme-color': '#2522fc',
  'color-scheme': data?.themePreference ?? 'light',
  type: 'website',
})

const fonts = [
  `/fonts/JetBrainsMono-Regular.woff2`,
  `/fonts/JetBrainsMono-Bold.woff2`,
  `/fonts/Inter-roman.var.woff2?v=3.19`,
  `/fonts/Inter-italic.var.woff2?v=3.19`,
]

export const links: LinksFunction = () => {
  return [
    ...fonts.map((href: string) => ({
      rel: 'preload',
      as: 'font',
      href,
      type: 'font/woff2',
      // crossOrigin: 'anonymous',
    })),
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: `/feed.xml`,
      title: 'XML Feed',
    },
  ]
}

export const loader: LoaderFunction = async ({request}) => {
  // Dark/light mode
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}

  const siteMeta = await client.fetch(siteMetaQuery).then((res) => siteMetaZ.parse(res))

  return json({
    siteMeta,
    themePreference: cookie.themePreference,
    ENV: {
      ...projectDetails(),
      NODE_ENV: process.env.NODE_ENV,
    },
  })
}

export default function App() {
  const {siteMeta, themePreference, ENV} = useLoaderData<LoaderData>()

  const {pathname} = useLocation()
  const isStudioRoute = pathname.startsWith('/studio')

  // Use browser default if cookie is not set
  const isDarkMode =
    !themePreference && typeof document !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : themePreference === `dark`
  const bodyClassNames = [
    `transition-colors duration-1000 ease-in-out min-h-screen`,
    isDarkMode ? `dark bg-blue-900 text-white` : `bg-white`,
  ]
    .join(' ')
    .trim()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {isStudioRoute && typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body className={bodyClassNames}>
        {isStudioRoute ? (
          <Outlet />
        ) : (
          <>
            <Header {...siteMeta} />
            <Banner />
            <PortableTextComponentsProvider components={components}>
              <Outlet />
            </PortableTextComponentsProvider>
            {ENV.NODE_ENV !== 'production' ? <Grid /> : null}
            <ScrollRestoration />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  )
}
