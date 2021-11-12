export interface ArticleDocument {
  _id: string
  slug?: {
    current?: string
  }
  title?: string
  summary?: string
  published?: string
  updated?: string
  content: Block[]
  image: {
    asset: {
      _id: string
      altText: string
    }
  }
}

export interface Block {
  _key: string
  _type: string
  style: string
  children: BlockChild[]
}

export interface BlockChild {
  text: string
}
