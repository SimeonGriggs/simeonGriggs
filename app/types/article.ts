import {z} from 'zod'

import {typedObjectZ} from './block'
import {sanityImageObjectExtendedZ} from './image'

export const articleZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  image: sanityImageObjectExtendedZ,
  tableOfContents: z.array(typedObjectZ).nullable(),
  content: z.array(typedObjectZ).nullable(),
  // comments?: CommentDocument[]
})

export const articlesZ = z.array(articleZ)

export type Article = z.infer<typeof articleZ>
