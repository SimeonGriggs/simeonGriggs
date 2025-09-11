import type {PortableTextTypeComponentProps} from '@portabletext/react'
import {Link} from 'react-router'
import {image} from '../image'
import {Video} from './video'

type TypeTalksValue = {
  talks: TalkCardProps[]
}

export function TypeTalks(
  props: PortableTextTypeComponentProps<TypeTalksValue>,
) {
  const {talks} = props.value

  return talks.map((talk) => <TalkCard key={talk._id} {...talk} />)
}

type TalkCardProps = {
  _id: string
  title: string
  link: string
  event: string
  eventDate: string
  location: string
  image: {
    alt: string
    url: string
    asset: {
      _id: string
    }
  }
  video: {
    url: string
  }
}

function TalkCard(props: TalkCardProps) {
  const {_id, title, video, link, event, eventDate, location} = props
  const clickableLink = link ?? video?.url

  return (
    <>
      {video?.url ? (
        <div className="w-full rounded-2xl aspect-video overflow-hidden">
          <Video
            url={video.url}
            title={title ?? ``}
            poster={image(props.image).width(1980).height(1080).url()}
          />
        </div>
      ) : (
        <img
          alt={props.image?.alt || ''}
          src={image(props.image).width(1980).height(1080).url()}
          className="w-full rounded-2xl"
        />
      )}
      <h3 className="mt-12 mb-10 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
        {video?.url ? (
          <Link
            to={video.url}
            prefetch="intent"
            className="block hover:bg-blue-500 hover:text-white"
            target="_blank"
          >
            {title}
          </Link>
        ) : (
          <>{title}</>
        )}
      </h3>

      {event ? (
        <p className="mb-10 text-base/8 first:mt-0 last:mb-0">
          {clickableLink ? (
            <a
              href={clickableLink}
              target="blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2"
            >
              "{event}," {eventDate}, {location ?? 'Remote'}
            </a>
          ) : (
            <>
              "{event}," {eventDate}, {location ?? 'Remote'}
            </>
          )}
        </p>
      ) : null}
    </>
  )
}
