import type {SanityImageSource} from '@sanity/asset-utils'

interface TypeCodeSandboxProps {
  value: SanityImageSource & {
    url: string
  }
}

export default function TypeCodeSandbox(props: TypeCodeSandboxProps) {
  const {value} = props

  if (!value?.url) return null

  return (
    <iframe
      loading="lazy"
      src={value.url}
      className="w-full h-[400px] border-0 rounded overflow-hidden"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  )
}
