import React, {useState, useEffect, useRef} from 'react'
import {useTransition} from 'remix'
import {AnnotationIcon} from '@heroicons/react/outline'

import CommentForm from './CommentForm'
import {BlockItem} from '~/lib/sanity/types'

export default function CommentableBlock(props: BlockItem) {
  const {children} = props
  const {_key, comments} = props.node
  const [open, setOpen] = useState(``)
  const [commentsCount, setCommentsCount] = useState(comments?.length ? comments.length : 0)
  const button = useRef()
  const transition = useTransition()
  // console.log(transition)
  const {submission} = transition

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
        className="hidden md:flex md:w-1/6 lg:w-1/8 h-full translate-x-full text-blue-200 dark:text-blue-600 group-hover:text-blue-500 rounded absolute right-0 top-0 items-center justify-center opacity-50 group-hover:opacity-100 transition-all duration-75 ease-in-out"
      >
        {commentsCount > 0 ? (
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-200 group-hover:bg-blue-500 text-white font-bold text-xs leading-none absolute -translate-y-0 group-hover:-translate-y-2 transition-transform duration-75 ease-in-out">
            {commentsCount} <span className="sr-only">comments</span>
          </div>
        ) : null}
        <span className="sr-only">Comment on this paragraph</span>
        <AnnotationIcon className="w-1/3 h-auto" />
      </button>
      {open === _key ? <CommentForm _key={_key} closeDialog={closeDialog} /> : null}
    </p>
  )
}
