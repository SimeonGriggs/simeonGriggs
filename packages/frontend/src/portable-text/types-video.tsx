import {PortableTextTypeComponentProps} from '@portabletext/react'
import {Video} from './video'

type TypeVideoValue = {
  url: string
  title: string
}

export function TypeVideo(
  props: PortableTextTypeComponentProps<TypeVideoValue>,
) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl">
      <Video url={props.value.url} title={props.value.title} />
    </div>
  )
}
