import {useRouteLoaderData} from 'react-router'

import type {loader} from '~/root'

export function useSanityConfig() {
  const data = useRouteLoaderData<typeof loader>('root')

  if (!data) {
    throw new Error('Missing root loader Sanity configuration')
  }

  return data.sanity
}
