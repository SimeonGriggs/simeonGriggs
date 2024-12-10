import {useState} from 'react'
import {useIsomorphicLayoutEffect} from 'usehooks-ts'

export function canUseDOM() {
  const [isClient, setIsClient] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

export function safeRedirect(to: FormDataEntryValue | string | null | undefined) {
  if (!to || typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//')) {
    return '/'
  }
  return to
}
