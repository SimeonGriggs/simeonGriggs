import type {SanityImageSource} from '@sanity/asset-utils'

export type ExtendedImageAsset = SanityImageSource & {
  _id: string
  url?: string
  asset: {
    altText?: string
    description?: string
    metadata?: {
      blurHash?: string
    }
  }
}

export interface ArticleDocument {
  source: 'blog' | 'community'
  _id: string
  _updatedAt: string
  slug: {
    current: string
  }
  title?: string
  summary: string
  published: string
  updated?: string
  content: Block[]
  image: ExtendedImageAsset
  comments?: CommentDocument[]
}

export interface TalkDocument {
  _id: string
  _updatedAt: string
  slug: {
    current: string
  }
  summary: string
  event?: string
  title?: string
  eventDate?: string
  location?: string
  link?: string
  video?: {
    title?: string
    url?: string
  }
  content: Block[]
  image: ExtendedImageAsset
  profilePhotos: ExtendedImageAsset[]
}

export interface CommentDocument {
  _type: `comment`
  content: string | null
  name: string | null
  commentKey: string | null
  email: string | null
  commentOn: {
    _type: `reference`
    _ref: string | null
  }
}

export interface BlockItem {
  value: Block
  children: BlockChild[]
}

export interface Block {
  _key: string
  _type: string
  style: string
  children: BlockChild[]
  comments?: CommentDocument[]
}

export interface BlockChild {
  text: string
}
