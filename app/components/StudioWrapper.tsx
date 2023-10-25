import {useSearchParams} from '@remix-run/react'
import {Studio} from 'sanity'

import {Hydrated} from '~/components/Hydrated'
import {config} from '~/sanity/config'

export default function StudioWrapper() {
  const [searchParams] = useSearchParams()

  return (
    <Hydrated>
      <Studio config={config} unstable_noAuthBoundary={searchParams.get('login') !== 'true'} />
    </Hydrated>
  )
}
