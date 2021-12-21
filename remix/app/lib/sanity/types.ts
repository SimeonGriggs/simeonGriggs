export interface ImageAsset {
  asset: {
    _id: string
    altText: string
  }
}

export interface ArticleDocument {
  _id: string
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
  node: Block
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
