import {createContext} from 'react'

import type {CommentKey} from '~/types/comment'

export const CommentsContext = createContext<CommentKey[]>([])

export function CommentsProvider({
  children,
  comments,
}: {
  children: React.ReactNode
  comments: CommentKey[]
}) {
  return <CommentsContext.Provider value={comments}>{children}</CommentsContext.Provider>
}
