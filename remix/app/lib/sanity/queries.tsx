import {groq} from '@sanity/groq-store'

export const siteMetaQuery = groq`*[_id == "siteMeta"][0]`

export const articleQuery = groq`*[_type == "article" && slug.current == $slug]{
    ...,
    image {
      ...,
      asset->
    },
    content[] {
        ...,
        _type == "image" => {
            ...,
            asset->
        },
    },
    "comments": *[_type == "comment" && references(^._id)]
  }`

export const homeQuery = groq`*[_type == "article" && defined(slug.current)]|order(published desc){
  "source": "blog",
    _id,
    title,
    slug,
    published,
    updated,
    summary,
    image {
      ...,
      asset->
    }
  }`

export const communityQuery = groq`*[_type match "contribution.guide" && $userId in authors[]._ref]|order(_createdAt desc) {
  "source": "community",
  _id,
  title,
  slug,
  "published": publishedAt,
  "summary": description
}`

export const communityParams = {
  userId: `e-cfe6c944570e1d29a8a0a8722108c4af`,
}
