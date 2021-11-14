import {useEffect, useState} from 'react'

import {store} from '~/lib/sanity/groqStore'

interface SubscriptionOptions<R = any> {
  enabled?: boolean
  params?: Record<string, unknown>
  initialData?: R
}

export function usePreviewSubscription(query: string, subscriptionOptions: SubscriptionOptions) {
  const {enabled, params, initialData} = subscriptionOptions
  const [data, setData] = useState(initialData)

  // Attempt to prevent bundling if not enabled?
  const [groqStore] = useState(enabled ? store(enabled) : null)

  useEffect(() => {
    let sub: any

    if (enabled && groqStore) {
      sub = groqStore.subscribe(
        query,
        params ?? {}, // Params
        (err: any, result: any) => {
          if (err) {
            console.error('Oh no, an error:', err)
            return
          }
          setData(result)
        }
      )
    }

    return () => {
      if (sub?.unsubscribe()) sub.unsubscribe()
      if (store) store.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {data}
}
