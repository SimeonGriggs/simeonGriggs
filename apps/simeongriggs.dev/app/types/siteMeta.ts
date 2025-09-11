import {z} from 'zod'

import {typedObjectZ} from './block'

export const siteMetaZ = z.object({
  _id: z.string(),
  author: z.string().nullable(),
  bio: z.array(typedObjectZ).nullable(),
  description: z.string().nullable(),
  siteUrl: z.string().nullable(),
  title: z.string().nullable(),
})

export type SiteMeta = z.infer<typeof siteMetaZ>
