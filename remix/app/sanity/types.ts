import {SanityImageAssetDocument} from '@sanity/client'
import {Block, SanityDocument, TypedObject} from 'sanity'

export type PageDocument = SanityDocument & {
  title: string
  slug: {current: string}
  content?: Block[]
  featuredImage: SanityImageAssetDocument
}

export type PostDocument = PageDocument & {
  categories?: CategoryDocument[]
  author?: UserDocument
  excerpt?: string
}

export type PostNavigationDocument = {
  title: string
  slug: {current: string}
}

export type UserDocument = {
  firstName: string
  lastName: string
  slug: {current: string}
  userId: string
}

export type CategoryDocument = SanityDocument & {
  name: string
  slug: {current: string}
  content?: Block[]
}

export type CommentStatus = 'Approved' | 'Pending' | 'Spam'

export type CommentDocument = SanityDocument & {
  name: string
  post: TypedObject | PostDocument
  status: CommentStatus
  email: string
  url: string
  content: Block[]
}

export type WidgetObject = {
  _key: string
  title: string
}

export type WidgetArchivesObject = WidgetObject & {
  _type: 'widgetArchives'
  data: string[]
}

export type WidgetCategoriesObject = WidgetObject & {
  _type: 'widgetCategories'
  data: CategoryDocument[]
}

export type WidgetRecentCommentsObject = WidgetObject & {
  _type: 'widgetRecentComments'
  data: CommentDocument[]
}

export type WidgetRecentPostsObject = WidgetObject & {
  _type: 'widgetRecentPosts'
  data: PostDocument[]
}

export type WidgetDocument = SanityDocument & {
  widgets: WidgetObject[]
  displayLocation: string
}

export type MenuDocument = SanityDocument & {
  displayLocation: string
  menuItems: MenuItem[]
}

export type MenuItem = {
  _key: string
  label: string
  url: string
  reference: {
    _id: string
    title: string
    name: string
    slug: {current: string}
  }
}
