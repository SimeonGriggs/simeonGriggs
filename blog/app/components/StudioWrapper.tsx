import {Studio} from 'sanity'
import baseConfig from '@repo/sanity'

import {Hydrated} from '~/components/Hydrated'

const config = {
  ...baseConfig,
  basePath: '/studio',
}

export default function StudioWrapper() {
  return (
    <Hydrated>
      <Studio config={config} unstable_noAuthBoundary />
    </Hydrated>
  )
}
