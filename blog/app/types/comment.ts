import {z} from 'zod'

export const commentKeyZ = z.string()

export type CommentKey = z.infer<typeof commentKeyZ>

export const commentZ = z.object({
  _type: z.literal('comment'),
  content: z.string(),
  name: z.string(),
  commentKey: commentKeyZ,
  email: z.string().email(),
  commentOn: z.object({
    _type: z.literal('reference'),
    _ref: z.string(),
  }),
})

export type Comment = z.infer<typeof commentZ>
