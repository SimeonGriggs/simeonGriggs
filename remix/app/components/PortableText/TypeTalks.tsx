import {TalkDocument} from '~/lib/sanity/types'
import Talk from '~/components/Talk'

type TypeTalksProps = {
  value: {
    talks: TalkDocument[]
  }
}

export default function TypeTalks(props: TypeTalksProps) {
  const {talks} = props?.value ?? {}

  if (!talks?.length) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-y-4">
      {talks.map((talk: TalkDocument) => (
        <Talk key={talk._id} {...talk} />
      ))}
    </div>
  )
}
