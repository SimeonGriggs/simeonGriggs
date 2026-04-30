import type {PortableTextTypeComponentProps} from '@portabletext/react'
import {stegaClean} from '@sanity/client/stega'
import type {ComponentType} from 'react'
import {useEffect, useMemo, useState} from 'react'
import type {TldrawImageProps} from 'tldraw'

type TldrawValue = {
  _type: 'tldraw'
  _key?: string
  document: string | null
}

/**
 * Renders a Sanity `tldraw` block using tldraw's read-only `TldrawImage` (not the full editor).
 * The real `tldraw` package is loaded only in the browser so SSR / Cloudflare Worker bundles stay small.
 */
export default function TypeTldraw(
  props: PortableTextTypeComponentProps<TldrawValue>,
) {
  const value = useMemo(() => {
    if (!props.value || props.value._type !== 'tldraw') {
      return null
    }
    return props.value as TldrawValue
  }, [props.value])

  const snapshot = useMemo(() => {
    if (!value?.document) return null
    try {
      return JSON.parse(stegaClean(value.document)) as TldrawImageProps['snapshot']
    } catch {
      return null
    }
  }, [value?.document])

  const [TldrawImage, setTldrawImage] =
    useState<ComponentType<TldrawImageProps> | null>(null)

  useEffect(() => {
    let cancelled = false

    void (async () => {
      await import('tldraw/tldraw.css')
      const mod = await import('tldraw')
      if (!cancelled) {
        setTldrawImage(mod.TldrawImage)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  if (!snapshot) {
    return null
  }

  if (!TldrawImage) {
    return (
      <div
        className="not-prose relative -mx-4 min-h-[12rem] border-b border-t border-gray-200 md:border dark:border-blue-700"
        aria-busy="true"
      >
        <div className="p-4 text-center text-gray-500">
          <p>Loading drawing…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="not-prose relative -mx-4 border-b border-t border-gray-200 md:border dark:border-blue-700">
      <TldrawImage snapshot={snapshot} format="svg" />
    </div>
  )
}
