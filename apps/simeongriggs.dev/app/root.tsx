import type {LinksFunction, LoaderFunctionArgs} from 'react-router'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from 'react-router'
import {z} from 'zod'

import CanonicalLink from '~/components/CanonicalLink'
import {themePreferenceCookie} from '~/cookies'
import {getEnv} from '~/env.server'
import {getBodyClassNames} from '~/lib/getBodyClassNames'
import {getDomainUrl} from '~/lib/getDomainUrl'

export const handle = {id: `root`}

const fonts = [
  `/fonts/JetBrainsMono-Regular.woff2`,
  `/fonts/JetBrainsMono-Bold.woff2`,
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

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const env = getEnv(context)
  // Dark/light mode
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = z
    .union([z.literal('dark'), z.literal('light')])
    .optional()
    .parse(cookie.themePreference)

  return {
    themePreference: themePreference || 'light',
    ENV: {
      VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID!,
      VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET!,
      VITE_SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION!,
      NODE_ENV: import.meta.env.MODE,
    },
    requestInfo: {
      origin: getDomainUrl(request),
    },
  }
}

export default function App() {
  const {themePreference, ENV, requestInfo} = useLoaderData<typeof loader>()

  const bodyClassNames = getBodyClassNames(themePreference)

  return (
    <html lang="en" className="scroll-pt-12 overflow-auto scroll-smooth">
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

function RootBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="prose lg:prose-xl container mx-auto">
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
    <div className="prose lg:prose-xl container mx-auto">
      <h1>Unknown error</h1>
      <p>
        <a href="/">Go home</a>
      </p>
    </div>
  )
}

export function ErrorBoundary() {
  return <RootBoundary />
}

// Back-compat with older Remix-style route modules.
export function CatchBoundary() {
  return <RootBoundary />
}
