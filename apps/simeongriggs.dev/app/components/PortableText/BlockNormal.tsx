import {ChatBubbleBottomCenterIcon} from '@heroicons/react/24/outline'
import type {PortableTextComponentProps} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import React, {useCallback, useContext, useState} from 'react'

import CommentForm from '~/components/Comments/CommentForm'
import {CommentsContext} from '~/components/Comments/CommentsContext'

export default function BlockNormal(
  props: PortableTextComponentProps<PortableTextBlock>,
) {
  const {children} = props
  const {_key} = props.value
  const comments = useContext(CommentsContext)
  const commentsCount = comments.filter(
    (commentKey) => commentKey === _key,
  ).length
  const [open, setOpen] = useState(``)
  const closeDialog = useCallback(() => setOpen(``), [])

  return (
    <p className="group relative">
      {children}
      <button
        type="button"
        onClick={() => setOpen(open ? `` : String(_key))}
        className={`lg:w-1/8 absolute right-0 top-0 hidden h-full translate-x-full items-center justify-center rounded transition-all duration-75 ease-in-out group-hover:text-blue-500 md:flex md:w-1/6 dark:text-blue-600 ${
          commentsCount > 0
            ? 'text-blue-400'
            : 'text-blue-200 dark:text-blue-500'
        }`}
        title="Comment on this paragraph"
      >
        {commentsCount > 0 ? (
          <span className="absolute flex h-5 w-5 -translate-y-0 select-none items-center justify-center rounded-full bg-blue-200 text-xs font-bold leading-none text-white transition-transform duration-75 ease-in-out group-hover:-translate-y-2 group-hover:bg-blue-500 dark:bg-blue-700">
            {commentsCount} <span className="sr-only">comments</span>
          </span>
        ) : null}
        <ChatBubbleBottomCenterIcon className="h-auto w-1/3" />
      </button>
      {open === _key ? (
        <CommentForm _key={_key} closeDialog={closeDialog} />
      ) : null}
    </p>
  )
}
