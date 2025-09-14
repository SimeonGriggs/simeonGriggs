import {z} from 'zod'

import {typedObjectZ} from './block'
import {commentKeyZ} from './comment'
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
  image: sanityImageObjectExtendedZ.nullable(),
  tableOfContents: z.array(typedObjectZ).nullable(),
  content: z.array(typedObjectZ).nullable(),
  comments: z.array(commentKeyZ).nullable(),
})

export const articlesZ = z.array(articleZ)

export type Article = z.infer<typeof articleZ>
