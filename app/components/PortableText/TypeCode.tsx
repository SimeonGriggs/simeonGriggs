import React from 'react'
import {z} from 'zod'
import type {PortableTextTypeComponentProps} from '@portabletext/react'
import type {Language} from 'prism-react-renderer'

import Prism from '~/components/Prism'
import {baseTypedObjectZ} from '~/types/block'

// baseTypedObject only looked for _type and _key
// and allows everything else with .passthrough()
// We'll override + extend it to be more specific
export const typedObjectCodeZ = baseTypedObjectZ.extend({
  _type: z.literal('code'),
  code: z.string().optional(),
  language: z.string().optional(),
})

export type TypedObjectCode = z.infer<typeof typedObjectCodeZ>

export default function TypeCode(props: PortableTextTypeComponentProps<TypedObjectCode>) {
  // Now we still get Zod's strict parsing on this specific TypedObject
  const value = React.useMemo(() => typedObjectCodeZ.parse(props.value), [props.value])
  const language = value?.language === 'groq' ? 'json' : value.language

  return value.code ? (
    <div className="not-prose">
      <Prism code={value.code} language={language as Language} />
    </div>
  ) : null
}
