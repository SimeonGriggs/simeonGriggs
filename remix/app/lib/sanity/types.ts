export interface ImageAsset {
  asset: {
    _id: string
    altText: string
    metadata: {
      blurHash: string
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
  image: ImageAsset
  comments?: CommentDocument[]
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
