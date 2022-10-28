import {groq} from '@sanity/groq-store'

const sanityImageObjectStubAsset = groq`
  _id,
  _type,
  altText,
  description,
  metadata {
    blurHash
  },
`
const sanityImageObjectStub = groq`
  crop,
  hotspot,
  asset->{${sanityImageObjectStubAsset}}`

export const siteMetaQuery = groq`*[_id == "siteMeta"][0]{
  author,
  bio,
  description,
  siteUrl,
  title
}`

export const articleQuery = groq`*[_type == "article" && slug.current == $slug]{
  _updatedAt,
  _id,
  title,
  slug,
  published,
  updated,
  summary,
  image { ${sanityImageObjectStub} },
  "tableOfContents": content[style in ["h2", "h3"]],
  content[] {
        ...,
        _type == "image" => {${sanityImageObjectStub}},
        _type == "button" => {
          link {
            text,
            reference->{slug},
            link
          },
        },
        _type == "talks" => {
          "talks": *[_type == "talk" && defined(slug.current)]|order(eventDate desc){
            _id,
            title,
            slug,
            event,
            eventDate,
            location,
            link,
            video {
              title,
              url
            },
            image { ${sanityImageObjectStub} },
          }
        },
        _type == "gallery" => {
          "images": *[_type == "sanity.imageAsset" && references(^._ref)]{
            url,
            ${sanityImageObjectStubAsset}
          }
        }
    },
    "comments": *[_type == "comment" && references(^._id)].commentKey
  }`

export const talkQuery = groq`*[_type == "talk" && slug.current == $slug]{
    ...,
    "summary": pt::text(content),
    image { ${sanityImageObjectStub} },
  }`

export const homeQuery = groq`*[_type == "article" && defined(slug.current) && unlisted != true]|order(published desc)
  {
    "source": "blog",
    _id,
    _updatedAt,
    title,
    slug,
    published,
    updated,
    summary,
    image { ${sanityImageObjectStub} }
  }`

export const exchangeQuery = groq`
  *[
    _type == "contribution.guide" 
    && defined(slug.current)
    && $userId in authors[]._ref 
  ]|order(_createdAt desc) {
  "source": "exchange",
  _id,
  title,
  slug,
  "published": publishedAt,
  "summary": description
}`

export const exchangeParams = {
  userId: `e-cfe6c944570e1d29a8a0a8722108c4af`,
}
