import {
  LinksFunction,
  LoaderFunction,
  useMatches,
  MetaFunction,
  Meta,
  Links,
  Scripts,
  useLoaderData,
  LiveReload,
  useCatch,
} from 'remix'

import {Outlet, useLocation} from 'react-router-dom'
import {useDarkMode} from 'usehooks-ts'

import {removeTrailingSlash} from './lib/helpers'
import {getEnv} from './lib/utils/env'
import {cookieNames, themePreference as cookie} from '~/cookies'
import {RestoreScrollPosition, useScrollRestoration} from '~/lib/utils/scroll'
import {getClient} from '~/lib/sanity/getClient'
import {siteMetaQuery} from '~/lib/sanity/queries'
import Banner from '~/components/Banner'
import Grid from '~/components/Grid'
import Header from '~/components/Header'
import stylesUrl from '~/styles/global.css'

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
  `/fonts/JetBrainsMono-Bold.woff2`,
  `/fonts/Inter-Regular.woff2`,
  `/fonts/Inter-Italic.woff2`,
  `/fonts/Inter-ExtraBold.woff2`,
  `/fonts/Inter-ExtraBoldItalic.woff2`,
]

export const links: LinksFunction = () => {
  return [
    ...fonts.map((path) => ({
      rel: 'preload',
      as: 'font',
      href: path,
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    })),
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
  ]
}

export const loader: LoaderFunction = async ({request}) => {
  const siteMeta = await getClient().fetch(siteMetaQuery)
  // const siteMeta = {}
  const ENV = getEnv()

  const requestCookies = request.headers.get('Cookie')?.split(';')
  const themePreference = requestCookies
    ?.find((row) => row.includes(`${cookieNames.THEME_PREFERENCE}=`))
    ?.split(`=`)
    .pop()

  return {siteMeta, ENV, themePreference}
}

function Document({children, title}: {children: React.ReactNode; title: string}) {
  const {ENV, siteMeta, themePreference} = useLoaderData()

  const {isDarkMode} = useDarkMode(themePreference === 'dark')
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href={canonical} />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body
        className={[
          `transition-colors duration-100 ease-out`,
          isDarkMode ? `dark text-white bg-blue-900` : `bg-white`,
        ]
          .join(' ')
          .trim()}
      >
        {children}
        <RestoreScrollPosition />
        <Scripts />
        {ENV.NODE_ENV === 'development' && (
          <>
            <Grid />
            <LiveReload />
          </>
        )}
      </body>
    </html>
  )
}

export default function App() {
  const data = useLoaderData()
  const matches = useMatches()

  const {siteMeta} = data

  const shouldManageScroll = matches.every((m) => (m.handle as any)?.scroll !== false)
  useScrollRestoration(shouldManageScroll)

  const shouldShowBanner = !matches.some((match) => match.handle === 'meta-image')

  return (
    <Document title={siteMeta?.title}>
      {shouldShowBanner && (
        <>
          <Header siteMeta={siteMeta} />
          <Banner />
        </>
      )}
      <main className="px-4 md:px-0 grid grid-cols-6 md:grid-cols-12 lg:grid-cols-16 min-h-screen w-screen">
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
          <h1>
            {caught.status} {caught.statusText}
          </h1>
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
