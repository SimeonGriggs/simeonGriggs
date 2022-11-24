import {LinkIcon} from '@heroicons/react/24/solid'
import {Link} from '@remix-run/react'
import React from 'react'

import Published from '~/components/Published'
import type {Talk} from '~/types/talk'

import SanityImage from './SanityImage'
import Video from './Video'

export default function TalkCard(props: Talk) {
  const {slug, image, title, event, eventDate, location, link, video} = props
  const clickableLink = link ?? video?.url

  return (
    <article className="not-prose">
      {video?.url ? <Video url={video.url} title={title ?? ``} /> : null}
      <div className="-mx-4 grid grid-cols-6 gap-y-4 border-b border-blue-100 py-4 dark:border-blue-800 lg:grid-cols-8">
        <div className="col-span-3 -ml-4 md:ml-0 lg:col-span-3">
          {image?.asset && image?.asset?._id ? (
            <SanityImage
              width={800}
              // TODO: Figure out why this type doesn't satisfy
              // asset={image}
              asset={{
                asset: {...image.asset},
                crop: image.crop,
                hotspot: image.hotspot,
              }}
            />
          ) : null}
        </div>
        <div className="col-span-6 flex flex-col gap-y-2 p-4 md:col-span-4 lg:col-span-5">
          <h3 className="text-2xl font-black tracking-tighter text-blue-500 md:text-2xl md:leading-none">
            {slug?.current ? (
              <Link
                to={`/talks/${slug.current}`}
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
                  <LinkIcon className="w-6" />
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
      </div>
    </article>
  )
}
