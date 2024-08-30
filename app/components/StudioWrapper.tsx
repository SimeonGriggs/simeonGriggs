import {Studio} from 'sanity'

import {Hydrated} from '~/components/Hydrated'
import {config} from '~/sanity/config'

export default function StudioWrapper() {
  return (
    <Hydrated>
      <Studio
        config={config}
        // unstable_noAuthBoundary
      />
    </Hydrated>
  )
}
