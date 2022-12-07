import {ClipboardIcon} from '@heroicons/react/24/outline'
import Highlight, {defaultProps} from 'prism-react-renderer'
import type {Language} from 'prism-react-renderer'
import {useCopyToClipboard} from 'usehooks-ts'

import simeonGriggsTheme from './simeonGriggsTheme'

type PrismProps = {
  code: string
  language?: Language
}

export default function Prism(props: PrismProps) {
  const {code = ``, language} = props
  const [, setCopiedText] = useCopyToClipboard()

  return (
    <div className="relative">
      <button
        className="text-white text-xs font-mono flex items-center gap-1 absolute top-1 hover:bg-blue-600 -right-3 px-3 py-2 bg-blue-500 focus:bg-white focus:text-blue-500 transition-colors duration-100 ease-in-out"
        onClick={() => setCopiedText(code.trim())}
      >
        <ClipboardIcon className="w-4 h-auto" />
        Copy
      </button>
      <Highlight
        {...defaultProps}
        code={code.trim()}
        language={language || 'markup'}
        theme={simeonGriggsTheme}
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre className={className} style={style}>
            {tokens.map((line, tokenI) => (
              <div key={tokenI} {...getLineProps({line})}>
                {line.map((token, lineI) => (
                  <span key={lineI} {...getTokenProps({token})} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
