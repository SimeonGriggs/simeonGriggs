import type {ReactNode} from 'react'

/**
 * Minimal stand-in for the `tldraw` package during SSR / Cloudflare Worker builds.
 * The real `tldraw` SDK is loaded on the client only (see `TypeTldraw` + Vite plugin).
 */
export function TldrawImage(_props: {snapshot?: unknown}): ReactNode {
  return null
}

export default {}
