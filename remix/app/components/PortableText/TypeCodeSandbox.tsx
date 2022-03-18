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
      className="h-[400px] w-full overflow-hidden rounded border-0"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  )
}
