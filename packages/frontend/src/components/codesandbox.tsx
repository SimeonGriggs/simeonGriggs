import type {PortableTextTypeComponentProps} from '@portabletext/react'
import React from 'react'

type CodeSandboxValue = {
  _type: 'codeSandbox'
  _key?: string
  url: string | null
}

export function TypeCodeSandbox(
  props: PortableTextTypeComponentProps<CodeSandboxValue>,
) {
  const value = React.useMemo(() => {
    if (!props.value || props.value._type !== 'codeSandbox') {
      return null
    }
    return props.value as CodeSandboxValue
  }, [props.value])

  if (!value?.url) return null

  return (
    <iframe
      title="CodeSandbox"
      loading="lazy"
      src={value.url}
      className="-mx-4 h-[400px] w-full overflow-hidden rounded border-0"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  )
}
