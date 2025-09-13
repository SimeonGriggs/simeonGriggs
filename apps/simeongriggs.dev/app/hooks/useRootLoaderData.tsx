import {useRouteLoaderData} from 'react-router'

export function useRootLoaderData() {
  const data = useRouteLoaderData('routes/_website') as any

  return data
}
