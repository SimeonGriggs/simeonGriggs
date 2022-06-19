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
    <article className="-mx-4 grid grid-cols-6 gap-y-4 bg-blue-100 p-4 dark:bg-blue-800 lg:grid-cols-8">
      <div className="col-span-3 -ml-4 md:ml-0 lg:col-span-3">
        {image ? <TypeImage width={800} value={image} /> : null}
      </div>
      <div className="col-span-6 flex flex-col gap-y-2 md:col-span-4 md:p-4 lg:col-span-5">
        <h3 className="text-2xl font-black tracking-tighter text-blue-500 md:text-2xl md:leading-none">
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
        </h3>
        {event ? (
          <p
            className={` text-blue-500 ${
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
          </p>
        ) : null}
        <div className="col-span-6 lg:col-span-8">
          {eventDate ? <Published published={eventDate} location={location ?? `Remote`} /> : null}
        </div>
      </div>
      {/* {summary ? (
        <div className="prose prose-lg dark:prose-dark prose-blue">
          <p>{summary}</p>
        </div>
      ) : null} */}
    </article>
  )
}
