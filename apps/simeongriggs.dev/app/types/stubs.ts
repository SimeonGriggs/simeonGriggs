import {z} from 'zod'

import {sanityImageObjectExtendedZ} from './image'
import {slugZ} from './slug'

// Articles, from this blog
export const articleStubZ = z.object({
  _id: z.string(),
  _type: z.literal('article'),
  slug: slugZ,
  title: z.string().nullable(),
  summary: z.string().nullable(),
  published: z.string().nullable(),
  updated: z.string().nullable(),
  image: sanityImageObjectExtendedZ.nullable(),
})

export type ArticleStub = z.infer<typeof articleStubZ>

export const articleStubsZ = z.array(articleStubZ)

export const talkStubZ = z.object({
  _id: z.string(),
  _type: z.literal('talk'),
  slug: slugZ,
  title: z.string().nullable(),
  summary: z.string().nullable(),
  published: z.string().nullable(),
  updated: z.string().nullable(),
  image: sanityImageObjectExtendedZ.nullable(),
  event: z.string().nullable(),
  link: z.string().nullable(),
})

export type TalkStub = z.infer<typeof talkStubZ>

export const externalArticleStubZ = z.object({
  _id: z.string(),
  _type: z.literal('externalArticle'),
  title: z.string().nullable(),
  summary: z.string().nullable(),
  published: z.string().nullable(),
  updated: z.string().nullable(),
  image: sanityImageObjectExtendedZ.nullable(),
  source: z.enum(['planetscale', 'sanity_guides', 'sanity_learn']),
  url: z.string().nullable(),
})

export type ExternalArticleStub = z.infer<typeof externalArticleStubZ>

export const externalArticleStubsZ = z.array(externalArticleStubZ)

// YouTube Video Documents, from this blog
export const youTubeVideoStubZ = z.object({
  _id: z.string(),
  _type: z.literal('youTubeVideo'),
  title: z.string(),
  published: z.string(),
  thumbnailUrl: z.string(),
  duration: z.string(),
  summary: z.string(),
  link: z.string(),
})

export type YouTubeVideoStub = z.infer<typeof youTubeVideoStubZ>

export const youTubeVideoStubsZ = z.array(youTubeVideoStubZ)

export const combinedStubsZ = z.array(
  z.discriminatedUnion('_type', [
    articleStubZ,
    talkStubZ,
    externalArticleStubZ,
    youTubeVideoStubZ,
  ]),
)

export type CombinedStubs = z.infer<typeof combinedStubsZ>
