import {z} from 'zod'

import {sanityImageObjectExtendedZ} from './image'
import {slugZ} from './slug'

// Articles, from this blog
export const articleStubZ = z.object({
  source: z.literal('blog'),
  _id: z.string(),
  slug: slugZ,
  title: z.string().nullable(),
  summary: z.string().nullable(),
  published: z.string().nullable(),
  updated: z.string().nullable(),
  image: sanityImageObjectExtendedZ.nullable(),
})

export type ArticleStub = z.infer<typeof articleStubZ>

export const articleStubsZ = z.array(articleStubZ)

// Exchange posts, from Sanity
export const exchangeStubZ = z.object({
  source: z.literal('exchange'),
  _id: z.string(),
  title: z.string().nullable(),
  slug: slugZ,
  published: z.string().nullable(),
  summary: z.string().nullable(),
})

export type ExchangeStub = z.infer<typeof exchangeStubZ>

export const exchangeStubsZ = z.array(exchangeStubZ)

export const combinedStubsZ = z.array(z.discriminatedUnion('source', [articleStubZ, exchangeStubZ]))

export type CombinedStubs = z.infer<typeof combinedStubsZ>
