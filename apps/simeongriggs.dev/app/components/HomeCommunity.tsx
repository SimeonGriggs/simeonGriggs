import {LinkIcon} from '@heroicons/react/24/solid'
import {Subheading} from '@repo/frontend'

import Published from '~/components/Published'
import type {ExchangeStub} from '~/types/stubs'

export default function HomeCommunity(props: ExchangeStub) {
  const {slug, title, published, updated, summary} = props

  return (
    <article className="-mx-4 grid grid-cols-1 gap-y-4 border-gray-100 px-4 md:mx-0 md:border-l-4 dark:border-blue-800">
      {slug?.current ? (
        <h3 className="text-2xl font-black tracking-tighter text-blue-500 hover:text-white md:text-2xl md:leading-none">
          <LinkIcon className="float-right h-auto w-5" />
          <a
            href={`https://www.sanity.io/guides/${slug.current}`}
            className="block hover:bg-[#f03e2f] hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h3>
      ) : (
        <h3>{title}</h3>
      )}

      {published ? (
        <div className="flex justify-between">
          <Published published={published} updated={updated ?? ``} />
          <Subheading>Posted on Sanity.io Exchange</Subheading>
        </div>
      ) : null}

      {summary ? (
        <div>
          <p>{summary}</p>
        </div>
      ) : null}
    </article>
  )
}
