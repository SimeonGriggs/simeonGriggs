import type {LinksFunction, MetaFunction} from '@remix-run/node'
import {ClientOnly} from 'remix-utils'
import {Studio} from 'sanity'

import {config} from '~/sanity/config'

import styles from '~/styles/studio.css'

export const meta: MetaFunction = () => ({
  title: 'Sanity Studio',
})

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export default function StudioPage() {
  return <ClientOnly>{() => <Studio config={config} />}</ClientOnly>
}
