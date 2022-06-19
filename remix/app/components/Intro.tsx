import {PortableText} from '~/lib/sanity/helpers'

export default function Intro({blocks = []}) {
  return (
    <div className="intro -mx-4 grid grid-cols-1 gap-y-4 bg-blue-500 p-4 font-mono text-white md:mx-0 md:p-8 md:text-lg">
      <PortableText value={blocks} comments={false} />
    </div>
  )
}
