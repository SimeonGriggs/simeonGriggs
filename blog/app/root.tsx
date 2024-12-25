import type {LinksFunction, LoaderFunctionArgs} from 'react-router'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from 'react-router'
import {z} from 'zod'

import CanonicalLink from '~/components/CanonicalLink'
import Grid from '~/components/Grid'
import LiveVisualEditing from '~/components/LiveVisualEditing'
import {themePreferenceCookie} from '~/cookies'
import {getBodyClassNames} from '~/lib/getBodyClassNames'
import {getDomainUrl} from '~/lib/getDomainUrl'
import {loadQueryOptions} from '~/sanity/loadQueryOptions'
import ExitPreview from './components/ExitPreview'

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
  // Dark/light mode
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = z
    .union([z.literal('dark'), z.literal('light')])
    .optional()
    .parse(cookie.themePreference)

  const {preview} = await loadQueryOptions(request.headers)

  return {
    themePreference: themePreference || 'light',
    ENV: {
      VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID!,
      VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET!,
      VITE_SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION!,
      NODE_ENV: process.env.NODE_ENV,
    },
    requestInfo: {
      origin: getDomainUrl(request),
    },
    preview,
  }
}

export default function App() {
  const {themePreference, ENV, requestInfo, preview} = useLoaderData<typeof loader>()

  const bodyClassNames = getBodyClassNames(themePreference)

  return (
    <html lang="en" className="scroll-pt-20 overflow-auto scroll-smooth">
      <head>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2522fc" />
        <meta name="color-scheme" content={themePreference} />
        <meta name="type" content="website" />
        <CanonicalLink origin={requestInfo.origin} />
      </head>
      <body className={bodyClassNames}>
        <Outlet />
        {/* {ENV.NODE_ENV === 'development' ? <Grid /> : null} */}
        {preview ? (
          <>
            <LiveVisualEditing />
            <ExitPreview />
          </>
        ) : null}
        <ScrollRestoration />
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
