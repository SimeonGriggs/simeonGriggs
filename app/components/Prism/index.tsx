import Highlight, {defaultProps} from 'prism-react-renderer'
import type {Language} from 'prism-react-renderer'

import simeonGriggsTheme from './simeonGriggsTheme'

type PrismProps = {
  code: string
  language?: Language
}

export default function Prism(props: PrismProps) {
  const {code = ``, language} = props

  return (
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
  )
}
