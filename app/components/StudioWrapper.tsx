import {ClientOnly} from 'remix-utils'
import {Studio} from 'sanity'

import {config} from '~/sanity/config'

export default function StudioWrapper() {
  return <ClientOnly>{() => <Studio config={config} unstable_noAuthBoundary />}</ClientOnly>
}
