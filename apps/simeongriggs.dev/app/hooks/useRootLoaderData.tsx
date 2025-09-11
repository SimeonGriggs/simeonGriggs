import type {SerializeFrom} from 'react-router'
import {useRouteLoaderData} from 'react-router'

import type {loader as websiteRootLoader} from '~/routes/_website'

export function useRootLoaderData() {
  const data = useRouteLoaderData(`routes/_website`) as SerializeFrom<
    typeof websiteRootLoader
  >

  return data
}
