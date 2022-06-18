import React from 'react'
import getYouTubeID from 'get-youtube-id'

// import {PlayIcon} from '@heroicons/react/solid'

interface TypeVideoProps {
  value: {
    url: string
    title?: string
  }
}

export default function TypeVideo(props: TypeVideoProps) {
  const {value} = props

  if (!value?.url) {
    return null
  }

  const urlCheck = new URL(value.url)

  if (urlCheck.hostname === 'www.loom.com') {
    const loomId = urlCheck.pathname ? [...urlCheck.pathname.split('/')].filter(Boolean).pop() : ``
    const loomEmbedUrl = `https://www.loom.com/embed/${loomId}`

    return (
      <div className="aspect-w-16 aspect-h-9 group relative -mx-4 block">
        <iframe
          loading="lazy"
          className="absolute top-0 left-0 h-full w-full"
          src={loomEmbedUrl}
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />
      </div>
    )
  }

  const id = getYouTubeID(value.url)

  return (
    <a
      href={value.url}
      target="_blank"
      rel="noopener noreferrer"
      className="aspect-w-16 aspect-h-9 group relative -mx-4 block"
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-500/50 text-white transition-colors duration-1000 group-hover:bg-blue-500/20">
        {/* <PlayIcon className="duration-250 h-auto w-1/6 transition-transform group-hover:scale-125" /> */}
      </div>
      {value?.title ? (
        <div className="absolute inset-0 z-10 p-4">
          <span className="text-xl font-black text-white md:text-2xl">{value.title}</span>
        </div>
      ) : null}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        loading="lazy"
        alt={value?.title ?? ``}
        className="h-full w-full object-cover"
      />
    </a>
  )
}
