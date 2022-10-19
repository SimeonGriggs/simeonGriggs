import React from 'react'
import {z} from 'zod'
import type {PortableTextTypeComponentProps} from '@portabletext/react'

import {baseTypedObjectZ} from '~/types/block'

export const typedObjectCodeSandboxZ = baseTypedObjectZ.extend({
  _type: z.literal('codeSandbox'),
  url: z.string().url().nullable(),
})

export type TypedObjectCodeSandbox = z.infer<typeof typedObjectCodeSandboxZ>

export default function TypeCodeSandbox(
  props: PortableTextTypeComponentProps<TypedObjectCodeSandbox>
) {
  // Now we still get Zod's strict parsing on this specific TypedObject
  const value = React.useMemo(() => typedObjectCodeSandboxZ.parse(props.value), [props.value])

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
