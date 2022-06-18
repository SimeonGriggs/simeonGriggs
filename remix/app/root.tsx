import {
  useMatches,
  Meta,
  Links,
  Scripts,
  useLoaderData,
  LiveReload,
  useCatch,
  ScrollRestoration,
  Link,
} from '@remix-run/react'
import {LinksFunction, LoaderFunction, MetaFunction} from '@remix-run/node'

import {Outlet, useLocation} from 'react-router-dom'
import {useDarkMode} from 'usehooks-ts'

import {removeTrailingSlash} from './lib/utils/helpers'
import {getEnv} from './lib/utils/getEnv'
import {getClient} from '~/lib/sanity/getClient'
import {siteMetaQuery} from '~/lib/sanity/queries'
import Banner from '~/components/Banner'
import Grid from '~/components/Grid'
import Header from '~/components/Header'
import stylesUrl from '~/styles/global.css'
import {themePreferenceCookie} from '~/cookies'

export const handle = `root`

export const meta: MetaFunction = ({data}) => {
  return {
    'theme-color': '#2522fc',
    'color-scheme': data?.themePreference ?? 'light',
    type: 'website',
  }
}

const fonts = [
  `/fonts/JetBrainsMono-Regular.woff2`,
  `/fonts/Inter-Regular.woff2`,
  `/fonts/Inter-ExtraBold.woff2`,
]

export const links: LinksFunction = () => {
  return [
    ...fonts.map((href: string) => ({
      rel: 'preload',
      as: 'font',
      href,
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    })),
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: `/feed.xml`,
      title: 'XML Feed',
    },
  ]
}

export const loader: LoaderFunction = async ({request}) => {
  const ENV = getEnv()

  const cookieHeader = request.headers.get('Cookie')
  // Scrap for now, ain't working
  // const themePreference = (await themePreferenceCookie.parse(cookieHeader)) || {}

  // welldoitlive.gif
  const cookieFind = cookieHeader
    ?.split(';')
    .find((cookie) => cookie.includes(themePreferenceCookie.name))
  const themePreference = cookieFind ? cookieFind.trim().split(`=`).pop() : ``

  const siteMeta = await getClient().fetch(siteMetaQuery)

  return {siteMeta, ENV, themePreference}
}

function Document({children, title}: {children: React.ReactNode; title?: string}) {
  const loaderData = useLoaderData()
  const {siteMeta, ENV, themePreference} = loaderData ?? {}

  // If not known server-side, use browser preference
  const isDarkMode =
    !themePreference && typeof document !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : themePreference === `dark`

  const {pathname} = useLocation()
  const matches = useMatches()
  const isMetaImage = matches.some((match) => match.handle === 'meta-image')
  const canonical = isMetaImage
    ? removeTrailingSlash(`${siteMeta?.siteUrl}${pathname}`).replace(`/meta-image`, ``)
    : removeTrailingSlash(`${siteMeta?.siteUrl}${pathname}`)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {title ? <title>{title}</title> : null}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href={canonical} />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body
        className={[
          `transition-colors duration-100 ease-out`,
          isDarkMode ? `dark bg-blue-900 text-white` : `bg-white`,
        ]
          .join(' ')
          .trim()}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
        {ENV?.NODE_ENV === 'development' && (
          <>
            <Grid />
            <LiveReload />
          </>
        )}
        {ENV ? (
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)};`,
            }}
          />
        ) : null}
      </body>
    </html>
  )
}

export default function App() {
  const data = useLoaderData()
  const {siteMeta} = data ?? {}

  // Note: Simeon does not endorse this code
  const matches = useMatches()
  const shouldShowHeader = !matches.some((match: any) => [`meta-image`].includes(match.handle))
  const shouldShowBanner =
    typeof document !== 'undefined' &&
    !matches.some((match: any) => [`meta-image`, `talk-index`].includes(match.handle))

  return (
    <Document>
      {shouldShowHeader ? <Header siteMeta={siteMeta} /> : null}
      {shouldShowBanner ? <Banner /> : null}
      <main className="lg:grid-cols-16 grid min-h-screen w-screen grid-cols-6 px-4 md:grid-cols-12 md:px-0">
        <Outlet />
      </main>
    </Document>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <div className="flex min-h-screen w-screen items-center justify-center">
            <article className="prose prose-lg prose-blue w-full">
              <h1>
                <span className="pr-5 font-mono">{caught.status}</span> {caught.statusText}
              </h1>
              <p>
                Report a broken link to <a href="mailto:simeon@hey.com">simeon@hey.com</a>
              </p>
              <p>
                <Link to="/">Return home</Link>
              </p>
            </article>
          </div>
        </Document>
      )

    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`)
  }
}

export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>Replace this UI with what you want users to see when your app throws uncaught errors.</p>
    </Document>
  )
}
