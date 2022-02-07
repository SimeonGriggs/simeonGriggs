import React from 'react'
import getYouTubeID from 'get-youtube-id'

import {PlayIcon} from '@heroicons/react/solid'

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

  const id = getYouTubeID(value.url)

  return (
    <a
      href={value.url}
      target="_blank"
      rel="noopener noreferrer"
      className="-mx-4 block aspect-w-16 aspect-h-9 relative group"
    >
      <div className="absolute z-10 inset-0 flex items-center justify-center text-white bg-blue-500/50 group-hover:bg-blue-500/20 transition-colors duration-1000">
        <PlayIcon className="w-1/6 h-auto group-hover:scale-125 transition-transform duration-250" />
      </div>
      {value?.title ? (
        <div className="absolute z-10 inset-0 p-4">
          <span className="text-xl md:text-2xl font-black text-white">{value.title}</span>
        </div>
      ) : null}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        loading="lazy"
        alt={value?.title ?? ``}
        className="w-full h-full object-cover"
      />
    </a>
  )
}
