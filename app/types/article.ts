import {z} from 'zod'

import {typedObjectZ} from './block'
import {sanityImageObjectExtendedZ} from './image'
import {slugZ} from './slug'

export const articleZ = z.object({
  _id: z.string(),
  _updatedAt: z.string(),
  slug: slugZ,
  published: z.string().nullable(),
  updated: z.string().nullable(),
  title: z.string().nullable(),
  summary: z.string().nullable(),
  image: sanityImageObjectExtendedZ,
  tableOfContents: z.array(typedObjectZ).nullable(),
  content: z.array(typedObjectZ).nullable(),
  // comments?: CommentDocument[]
})

export const articlesZ = z.array(articleZ)

export type Article = z.infer<typeof articleZ>
