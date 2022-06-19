import React, {useState, useEffect, useRef} from 'react'
import {useTransition} from '@remix-run/react'
import {AnnotationIcon} from '@heroicons/react/outline'

import CommentForm from './CommentForm'
import {BlockItem} from '~/lib/sanity/types'

export default function CommentableBlock(props: BlockItem) {
  const {children} = props
  const {_key, comments} = props.value
  const [open, setOpen] = useState(``)
  const [commentsCount, setCommentsCount] = useState(comments?.length ?? 0)
  const button = useRef<HTMLButtonElement>(null)

  const {submission} = useTransition()

  useEffect(() => {
    if (submission) {
      closeDialog()

      // Optimistically update the comments count
      if (submission.formData.get(`_key`) === _key) {
        setCommentsCount(commentsCount + 1)
      }

      if (button.current) {
        button.current.blur()
      }
    }
  }, [submission])

  const closeDialog = () => setOpen(``)

  return (
    <p block-key={_key} className="group">
      {children}
      <button
        type="button"
        ref={button}
        onClick={() => setOpen(open ? `` : _key)}
        className="lg:w-1/8 absolute right-0 top-0 hidden h-full translate-x-full items-center justify-center rounded text-blue-200 opacity-50 transition-all duration-75 ease-in-out group-hover:text-blue-500 group-hover:opacity-100 dark:text-blue-600 md:flex md:w-1/6"
      >
        {commentsCount > 0 ? (
          <div className="absolute flex h-5 w-5 -translate-y-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold leading-none text-white transition-transform duration-75 ease-in-out group-hover:-translate-y-2 group-hover:bg-blue-500">
            {commentsCount} <span className="sr-only">comments</span>
          </div>
        ) : null}
        <span className="sr-only">Comment on this paragraph</span>
        <AnnotationIcon className="h-auto w-1/3" />
      </button>
      {open === _key ? <CommentForm _key={_key} closeDialog={closeDialog} /> : null}
    </p>
  )
}
