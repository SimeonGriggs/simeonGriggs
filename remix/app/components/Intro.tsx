import {PortableText} from '~/lib/sanity/helpers'

export default function Intro({blocks = []}) {
  return (
    <div className="intro bg-blue-500 p-4 font-mono text-white md:p-8 md:text-lg">
      <PortableText value={blocks} comments={false} />
    </div>
  )
}
