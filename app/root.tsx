import {PortableTextComponentsProvider} from '@portabletext/react'
import type {MetaFunction} from '@remix-run/node'
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

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix + Sanity Studio v3 App',
  viewport: 'width=device-width,initial-scale=1',
})

export async function loader() {
  const siteMeta = await client.fetch(siteMetaQuery).then((res) => siteMetaZ.parse(res))

  return json({siteMeta, ENV: projectDetails()})
}

type LoaderData = {
  ENV: {[key: string]: string}
  siteMeta: SiteMeta
}

export default function App() {
  const {siteMeta, ENV} = useLoaderData<LoaderData>()

  const {pathname} = useLocation()
  const isStudioRoute = pathname.startsWith('/studio')

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {isStudioRoute && typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body className="min-h-screen">
        <Header {...siteMeta} />
        <Grid />
        <Banner />
        <PortableTextComponentsProvider components={components}>
          <Outlet />
        </PortableTextComponentsProvider>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
