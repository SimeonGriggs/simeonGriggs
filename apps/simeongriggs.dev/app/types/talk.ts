import {z} from 'zod'

import {sanityImageObjectExtendedZ} from './image'
import {slugZ} from './slug'

export const talkZ = z.object({
  _id: z.string(),
  _type: z.literal('talk'),
  title: z.string().nullable(),
  slug: slugZ,
  event: z.string().nullable(),
  eventDate: z.string().nullable(),
  location: z.string().nullable(),
  link: z.string().nullable(),
  video: z
    .object({
      title: z.string().nullable(),
      url: z.string().url().nullable(),
    })
    .nullable(),
  image: sanityImageObjectExtendedZ.nullable(),
})

export type Talk = z.infer<typeof talkZ>
