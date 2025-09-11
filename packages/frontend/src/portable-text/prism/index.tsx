import {ClipboardIcon} from '@heroicons/react/24/outline'
import {stegaClean} from '@sanity/client/stega'
import clsx from 'clsx'
import type {Language, RenderProps} from 'prism-react-renderer'
import {Highlight} from 'prism-react-renderer'
import {useRef, useState} from 'react'
import {useCopyToClipboard} from 'usehooks-ts'

import {simeonGriggsTheme} from './simeon-griggs-theme'

type PrismProps = {
  code: string
  language?: Language
  highlightedLines?: number[]
}

export default function Prism(props: PrismProps) {
  const {language, highlightedLines = []} = props
  const [code] = useState(stegaClean(props.code))

  const [buttonLabel, setButtonLabel] = useState<`Copy` | `Copied`>(`Copy`)
  const copyButtonRef = useRef<HTMLButtonElement>(null)
  const [, setCopiedText] = useCopyToClipboard()

  const handleCopy = () => {
    setCopiedText(code.trim())

    setButtonLabel(`Copied`)

    setTimeout(() => {
      setButtonLabel(`Copy`)
      if (copyButtonRef.current) {
        copyButtonRef.current.blur()
      }
    }, 3000)
  }

  if (!code) {
    return null
  }

  return (
    <div className="relative">
      <button
        className="absolute -right-3 top-1 flex items-center gap-1 bg-blue-500 px-3 py-2 font-mono text-xs text-white transition-colors duration-500 ease-in-out hover:bg-blue-600 focus:bg-white focus:text-blue-500"
        onClick={handleCopy}
        ref={copyButtonRef}
      >
        <ClipboardIcon className="h-auto w-4" />
        {buttonLabel}
      </button>
      <Highlight
        code={code.trim()}
        language={language || 'markup'}
        theme={simeonGriggsTheme}
      >
        {({
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }: RenderProps) => (
          <pre
            className={clsx(className, '-mx-4 p-8 text-base/loose')}
            style={style}
          >
            <code translate="no">
              {tokens.map((line, tokenI) => {
                const lineProps = getLineProps({line})
                const isHighlighted =
                  highlightedLines && highlightedLines.includes(tokenI + 1)

                return (
                  <div
                    key={tokenI}
                    {...lineProps}
                    className={clsx(
                      lineProps.className,
                      isHighlighted &&
                        `-mx-4 bg-blue-700 px-4 md:-mx-8 md:px-8`,
                    )}
                  >
                    {line.map((token, lineI) => (
                      <span key={lineI} {...getTokenProps({token})} />
                    ))}
                  </div>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
