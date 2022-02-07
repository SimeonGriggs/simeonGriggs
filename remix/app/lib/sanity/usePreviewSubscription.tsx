import {GroqStore} from '@sanity/groq-store'
import {useEffect, useState} from 'react'
import {getUser} from './getUser'

interface SubscriptionOptions<R = any> {
  enabled?: boolean
  params?: Record<string, unknown>
  initialData?: R
}

export function usePreviewSubscription(query: string, subscriptionOptions: SubscriptionOptions) {
  const {enabled, params, initialData} = subscriptionOptions
  const [data, setData] = useState(initialData)

  useEffect(() => {
    let sub: any
    let store: GroqStore | undefined

    async function createStore() {
      const user = await getUser()

      if (!user?.id) return

      const groqStore = await import('~/lib/sanity/groqStore')

      if (!groqStore?.store) return

      store = groqStore.store

      store.subscribe(
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

    if (enabled) {
      createStore()
    }

    return () => {
      if (sub?.unsubscribe()) sub.unsubscribe()
      if (store) store.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {data}
}
