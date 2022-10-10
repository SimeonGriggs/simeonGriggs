import Highlight, {defaultProps} from 'prism-react-renderer'
import type {Language} from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'

type PrismProps = {
  code: string
  language?: Language
}

export default function Prism(props: PrismProps) {
  const {code = ``, language} = props

  return (
    <Highlight {...defaultProps} code={code.trim()} language={language || 'markup'} theme={github}>
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
