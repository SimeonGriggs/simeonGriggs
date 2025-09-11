import React from 'react'

type HomeTitleProps = {
  wave?: boolean
  title: string
}

export default function HomeTitle(props: HomeTitleProps) {
  const {title, wave} = props

  return (
    <header className="text-5xl md:text-7xl">
      {wave ? <span className="wave mb-4">👋</span> : null}
      <h1 className="flex flex-col text-pretty font-black tracking-tighter text-blue-500">
        {title}
      </h1>
    </header>
  )
}
