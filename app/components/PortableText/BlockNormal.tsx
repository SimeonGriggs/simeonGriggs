import React, {useCallback, useContext, useState} from 'react'
import {ChatBubbleBottomCenterIcon} from '@heroicons/react/24/outline'
import type {PortableTextComponentProps} from '@portabletext/react'

import {CommentsContext} from '~/components/Comments/CommentsContext'
import CommentForm from '~/components/Comments/CommentForm'
import type {TypedObjectBlock} from '~/types/block'

export default function BlockNormal(props: PortableTextComponentProps<TypedObjectBlock>) {
  const {children} = props
  const {_key} = props.value
  const comments = useContext(CommentsContext)
  const commentsCount = comments.filter((commentKey) => commentKey === _key).length
  const [open, setOpen] = useState(``)
  const closeDialog = useCallback(() => setOpen(``), [])

  return (
    <p className="group">
      {children}
      <button
        type="button"
        onClick={() => setOpen(open ? `` : String(_key))}
        className={`absolute right-0 top-0 hidden h-full translate-x-full items-center justify-center rounded transition-all duration-75 ease-in-out group-hover:text-blue-500 dark:text-blue-600 md:flex md:w-1/6 lg:w-1/8 ${
          commentsCount > 0 ? 'text-blue-400' : 'text-blue-200 dark:text-blue-500'
        }`}
      >
        {commentsCount > 0 ? (
          <span className="absolute flex h-5 w-5 -translate-y-0 select-none items-center justify-center rounded-full bg-blue-200 text-xs font-bold leading-none text-white transition-transform duration-75 ease-in-out group-hover:-translate-y-2 group-hover:bg-blue-500 dark:bg-blue-700">
            {commentsCount} <span className="sr-only">comments</span>
          </span>
        ) : null}
        <span className="sr-only select-none">Comment on this paragraph</span>
        <ChatBubbleBottomCenterIcon className="h-auto w-1/3" />
      </button>
      {open === _key ? <CommentForm _key={_key} closeDialog={closeDialog} /> : null}
    </p>
  )
}
