import {ClipboardIcon} from '@heroicons/react/24/outline'
import Highlight, {defaultProps} from 'prism-react-renderer'
import type {Language} from 'prism-react-renderer'
import {useCallback, useRef, useState} from 'react'
import {useCopyToClipboard} from 'usehooks-ts'

import simeonGriggsTheme from './simeonGriggsTheme'

type PrismProps = {
  code: string
  language?: Language
  highlightedLines?: number[]
}

const augmentLineProps = (lineNum: number, highlightedLines: number[]) => {
  const isHighlighted = highlightedLines.includes(Number(lineNum + 1))
  return {
    className: isHighlighted ? '-mx-4 px-4 md:-mx-8 md:px-8 bg-blue-700' : undefined,
  }
}

export default function Prism(props: PrismProps) {
  const {code = ``, language, highlightedLines = []} = props
  const [buttonLabel, setButtonLabel] = useState<`Copy` | `Copied`>(`Copy`)
  const copyButtonRef = useRef<HTMLButtonElement>(null)
  const [, setCopiedText] = useCopyToClipboard()

  const handleCopy = useCallback(() => {
    setCopiedText(code.trim())

    setButtonLabel(`Copied`)

    setTimeout(() => {
      setButtonLabel(`Copy`)
      if (copyButtonRef.current) {
        copyButtonRef.current.blur()
      }
    }, 3000)
  }, [code, setCopiedText])

  if (!code) {
    return null
  }

  return (
    <div className="relative">
      <button
        className="text-white text-xs font-mono flex items-center gap-1 absolute top-1 hover:bg-blue-600 -right-3 px-3 py-2 bg-blue-500 focus:bg-white focus:text-blue-500 transition-colors duration-500 ease-in-out"
        onClick={handleCopy}
        ref={copyButtonRef}
      >
        <ClipboardIcon className="w-4 h-auto" />
        {buttonLabel}
      </button>
      <Highlight
        {...defaultProps}
        code={code.trim()}
        language={language || 'markup'}
        theme={simeonGriggsTheme}
      >
        {({className, style, tokens, getTokenProps}) => (
          <pre className={className} style={style}>
            {tokens.map((line, lineI) => (
              <div key={lineI} {...augmentLineProps(lineI, highlightedLines)}>
                {line.map((token, tokenI) => (
                  <span key={tokenI} {...getTokenProps({token})} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
