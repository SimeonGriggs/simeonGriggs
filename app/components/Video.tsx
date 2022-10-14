import React from 'react'
import getYouTubeID from 'get-youtube-id'
import {PlayIcon} from '@heroicons/react/24/outline'

type VideoProps = {
  url: string
  title?: string
}

export default function Video(props: VideoProps) {
  const {url, title} = props
  const urlCheck = new URL(url)

  if (urlCheck.hostname === 'www.loom.com') {
    const loomId = urlCheck.pathname ? [...urlCheck.pathname.split('/')].filter(Boolean).pop() : ``
    const loomEmbedUrl = `https://www.loom.com/embed/${loomId}`

    return (
      <div className="not-prose group aspect-w-16 aspect-h-9 relative -mx-4 block">
        <iframe
          title={title ?? `Loom video`}
          loading="lazy"
          className="absolute top-0 left-0 h-full w-full"
          src={loomEmbedUrl}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  }

  const id = getYouTubeID(url)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group aspect-w-16 aspect-h-9 relative -mx-4 block"
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-500/50 text-white transition-colors duration-1000 group-hover:bg-blue-500/20">
        <PlayIcon className="duration-250 h-auto w-1/6 transition-transform group-hover:scale-125" />
      </div>
      {title ? (
        <div className="absolute inset-0 z-10 p-4 pr-12 leading-none md:pr-32">
          <span className="text-lg font-black text-white md:text-xl lg:text-2xl">{title}</span>
        </div>
      ) : null}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        loading="lazy"
        alt={title ?? ``}
        className="h-full w-full object-cover"
      />
    </a>
  )
}
