import type {PortableTextTypeComponentProps} from '@portabletext/react'
import type {Language} from 'prism-react-renderer'

import Prism from './prism'

type TypeCodeValue = {
  code: string
  language: string
  highlightedLines: number[]
}

export function TypeCode(props: PortableTextTypeComponentProps<TypeCodeValue>) {
  const {code, highlightedLines} = props.value
  const language =
    props.value.language === 'groq' ? 'json' : props.value.language

  return code ? (
    <div className="not-prose">
      <Prism
        code={code}
        language={language as Language}
        highlightedLines={highlightedLines ? highlightedLines : []}
      />
    </div>
  ) : null
}
