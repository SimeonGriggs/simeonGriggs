import type {SerializeFrom} from '@remix-run/node'
import {useRouteLoaderData} from '@remix-run/react'

import type {loader as websiteRootLoader} from '~/routes/_website'

export function useRootLoaderData() {
  const data = useRouteLoaderData(`routes/_website`) as SerializeFrom<typeof websiteRootLoader>

  return data
}
