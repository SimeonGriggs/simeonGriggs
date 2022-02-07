import Prism from '~/components/Prism'

interface TypeCodeProps {
  value: {
    code: string
    language?: string
  }
}

export default function TypeCode(props: TypeCodeProps) {
  const {value} = props

  if (!value?.code) return null

  return <Prism code={value.code} language={value?.language} />
}
