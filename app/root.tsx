import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import {z} from 'zod'

import Banner from '~/components/Banner'
import CanonicalLink from '~/components/CanonicalLink'
import Grid from '~/components/Grid'
import Header from '~/components/Header'
import {themePreferenceCookie} from '~/cookies'
import {getBodyClassNames} from '~/lib/getBodyClassNames'
import {getDomainUrl} from '~/lib/getDomainUrl'
import {getEnv} from '~/lib/getEnv.server'
import {client} from '~/sanity/client'
import {siteMetaQuery} from '~/sanity/queries'
import {siteMetaZ} from '~/types/siteMeta'

export const handle = {id: `root`}

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
      crossOrigin: 'anonymous' as const,
    })),
    {rel: 'preconnect', href: 'https://cdn.sanity.io'},
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: `/feed.xml`,
      title: 'XML Feed',
    },
  ]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {pathname} = new URL(request.url)
  const isStudioRoute = pathname.startsWith('/studio')
  const isResourceRoute = pathname.startsWith('/resource')

  // Dark/light mode
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = z
    .union([z.literal('dark'), z.literal('light')])
    .optional()
    .parse(cookie.themePreference)

  const siteMeta = isStudioRoute
    ? null
    : await client.fetch(siteMetaQuery).then((res) => siteMetaZ.parse(res))

  return json({
    siteMeta,
    isStudioRoute,
    isResourceRoute,
    themePreference,
    ENV: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
    },
  })
}

export default function App() {
  const {siteMeta, isStudioRoute, isResourceRoute, themePreference, ENV, requestInfo} =
    useLoaderData<typeof loader>()

  const bodyClassNames = getBodyClassNames(themePreference)

  return (
    <html lang="en" className="scroll-pt-20 overflow-auto scroll-smooth">
      <head>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2522fc" />
        <meta name="color-scheme" content={themePreference ?? 'light'} />
        <meta name="type" content="website" />
        <CanonicalLink origin={requestInfo.origin} />
        {isStudioRoute && typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body className={bodyClassNames}>
        {isStudioRoute || isResourceRoute ? (
          <Outlet />
        ) : (
          <>
            {siteMeta?.title ? <Header title={siteMeta.title} /> : null}
            <Banner />
            <Outlet />
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
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container prose mx-auto lg:prose-xl">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>
          <a href="/">Go home</a>
        </p>
      </div>
    )
  }

  return (
    <div className="container prose mx-auto lg:prose-xl">
      <h1>Unknown error</h1>
      <p>
        <a href="/">Go home</a>
      </p>
    </div>
  )
}
