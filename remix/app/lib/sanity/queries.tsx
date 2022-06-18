import {groq} from '@sanity/groq-store'

const extendedImage = groq`
  _id,
  altText,
  description,
  metadata {
    blurHash
  }
`
const extendedImageAsset = groq`
  asset->{${extendedImage}}`

export const siteMetaQuery = groq`*[_id == "siteMeta"][0]`

export const articleQuery = groq`*[_type == "article" && slug.current == $slug]{
    ...,
    image { ${extendedImageAsset} },
    content[] {
        ...,
        _type == "image" => {${extendedImageAsset}},
    },
    "comments": *[_type == "comment" && references(^._id)]
  }`

export const talkQuery = groq`*[_type == "talk" && slug.current == $slug]{
    ...,
    image {
      ${extendedImageAsset}
    },
  }`

export const talksIndexQuery = groq`{
  "talks": *[_type == "talk" && defined(slug.current)]|order(eventDate desc){
    _id,
    title,
    // slug,
    event,
    eventDate,
    location,
    link,
    video {
      title,
      url
    },
    image { ${extendedImageAsset} },
    // content
  },
  "profilePhotos": *[_type == "media.tag" && name.current == "Profile"][0]{
    "images": *[_type == "sanity.imageAsset" && references(^._id)] {
      _id,
      url,
      "asset": {
        ${extendedImage}
      }
    }
  }.images
}
`

export const homeQuery = groq`*[_type == "article" && defined(slug.current)]|order(published desc){
  "source": "blog",
    _id,
    title,
    slug,
    published,
    updated,
    summary,
    image {
      ${extendedImageAsset}
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
