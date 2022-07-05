import type {MetaFunction} from '@remix-run/node'
import {ClientOnly} from 'remix-utils'

import Studio from '~/components/Studio'

export let handle = `studio`

export let meta: MetaFunction = () => {
  return {
    title: 'Sanity Studio',
    description: 'The Platform for Structured Content',
  }
}

export default function StudioPage() {
  return (
    <ClientOnly>
      {() => (
        <div id="sanity-studio">
          <Studio />
        </div>
      )}
    </ClientOnly>
  )
}
