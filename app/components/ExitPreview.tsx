import React from 'react'

export default function ExitPreview() {
  return (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-end justify-center z-50">
      <form className="pointer-events-auto" action="/resource/preview" method="POST">
        <button className="bg-orange-500 p-4 font-bold text-white" type="submit">
          Exit Preview Mode
        </button>
      </form>
    </div>
  )
}
