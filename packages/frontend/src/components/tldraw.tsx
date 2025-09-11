import type {PortableTextTypeComponentProps} from '@portabletext/react'
import {stegaClean} from '@sanity/client/stega'
import React, {Suspense, useMemo} from 'react'

// Note: Consuming apps must import 'tldraw/tldraw.css' to style tldraw components

type TldrawValue = {
  _type: 'tldraw'
  _key?: string
  document: string | null
}

// Lazy load the tldraw component with error boundary
const TldrawRenderer = React.lazy(async () => {
  try {
    // Import the component
    const {TldrawImage} = await import('tldraw')

    return {
      default: ({snapshot}: {snapshot: any}) => (
        <TldrawImage snapshot={snapshot} />
      ),
    }
  } catch (error) {
    console.warn(
      error,
      'tldraw is not installed. Install it as a dependency to use TypeTldraw component.',
    )

    // Return a fallback component
    return {
      default: () => (
        <div className="not-prose relative -mx-4 border-b border-t border-gray-200 p-4 text-center text-gray-500 md:border dark:border-blue-700">
          <p>Tldraw component requires the 'tldraw' package to be installed.</p>
        </div>
      ),
    }
  }
})

export default function TypeTldraw(
  props: PortableTextTypeComponentProps<TldrawValue>,
) {
  const value = useMemo(() => {
    if (!props.value || props.value._type !== 'tldraw') {
      return null
    }
    return props.value as TldrawValue
  }, [props.value])

  if (!value?.document) {
    return null
  }

  return (
    <div className="not-prose relative -mx-4 border-b border-t border-gray-200 md:border dark:border-blue-700">
      <Suspense
        fallback={
          <div className="p-4 text-center text-gray-500">
            <p>Loading tldraw...</p>
          </div>
        }
      >
        <TldrawRenderer snapshot={JSON.parse(stegaClean(value.document))} />
      </Suspense>
    </div>
  )
}
