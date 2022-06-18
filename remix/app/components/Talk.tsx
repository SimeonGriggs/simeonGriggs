import React from 'react'
import {Link} from '@remix-run/react'
import {ExternalLinkIcon} from '@heroicons/react/solid'

import TypeImage from './PortableText/TypeImage'
import {TalkDocument} from '~/lib/sanity/types'
import Published from '~/components/Published'

export default function Talk(props: TalkDocument) {
  const {slug, image, title, event, eventDate, location, link, video} = props
  const clickableLink = link ?? video?.url

  return (
    <article className="grid grid-cols-1 gap-y-4">
      {image ? <TypeImage value={image} /> : null}
      <h2 className="text-3xl font-black tracking-tighter text-blue-500 md:text-4xl md:leading-none">
        {slug?.current ? (
          <Link
            to={`/${slug.current}`}
            prefetch="intent"
            className="block hover:bg-blue-500 hover:text-white"
          >
            {title}
          </Link>
        ) : (
          <>{title ?? null}</>
        )}
      </h2>
      {event ? (
        <h3
          className={`text-2xl font-black tracking-tighter text-blue-500 md:text-2xl md:leading-none ${
            clickableLink ? `hover:bg-blue-500 hover:text-white` : ``
          }`}
        >
          {clickableLink ? (
            <a
              href={clickableLink}
              target="blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2"
            >
              {event}
              <ExternalLinkIcon className="w-6" />
            </a>
          ) : (
            event
          )}
        </h3>
      ) : null}
      {eventDate ? <Published published={eventDate} location={location ?? `Remote`} /> : null}
      {/* {summary ? (
        <div className="prose prose-lg dark:prose-dark prose-blue">
          <p>{summary}</p>
        </div>
      ) : null} */}
    </article>
  )
}
