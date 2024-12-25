import groq from 'groq'

export const SANITY_IMAGE_OBJECT_STUB_ASSET = groq`
  _id,
  _type,
  altText,
  description,
  metadata {
    blurHash
  },
`
const SANITY_IMAGE_OBJECT_STUB = groq`
  crop,
  hotspot,
  asset->{${SANITY_IMAGE_OBJECT_STUB_ASSET}}`

export const SITE_META_QUERY = groq`*[_id == "siteMeta"][0]{
  author,
  bio,
  description,
  siteUrl,
  title
}`

export const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0]{
  _updatedAt,
  _id,
  title,
  slug,
  published,
  updated,
  summary,
  image { ${SANITY_IMAGE_OBJECT_STUB} },
  "tableOfContents": content[style in ["h2", "h3"]],
  content[] {
        ...,
        _type == "block" => {
          ...,
          markDefs[]{
            ...,
            _type == "reference" => {
              "slug": @->slug.current,
              "title": @->title,
            },
          },
        },
        _type == "image" => {${SANITY_IMAGE_OBJECT_STUB}},
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
            image { ${SANITY_IMAGE_OBJECT_STUB} },
          }
        },
        _type == "gallery" => {
          "images": *[_type == "sanity.imageAsset" && references(^._ref)]{
            url,
            ${SANITY_IMAGE_OBJECT_STUB_ASSET}
          }
        }
    },
    "comments": *[_type == "comment" && references(^._id)].commentKey
  }`

export const TALK_PROJECTION = groq`
  _id,
  _type,
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
  "summary": pt::text(content),
  image { ${SANITY_IMAGE_OBJECT_STUB} }
`

export const TALK_QUERY = groq`*[_type == "talk" && slug.current == $slug]{ ${TALK_PROJECTION} }`

export const HOME_QUERY = groq`
  *[_type in ["article", "talk", "youTubeVideo"] && unlisted != true]|order(published desc){
    _id,
    _type,
    _updatedAt,
    title,
    slug,
    image { ${SANITY_IMAGE_OBJECT_STUB} },
    _type == "article" => {
      published,
      updated,
      summary
    },
    _type == "talk" => { 
      "published": eventDate,
      updated,
      "summary": pt::text(content),
      event,
      link
    },
    _type == "youTubeVideo" => {
      "published": publishedAt,
      thumbnailUrl,
      "summary": description,
      duration,
      "link": "https://www.youtube.com/watch?v=" + id
    }
}`

export const EXCHANGE_QUERY = groq`
  *[
    _type == "contribution.guide" 
    && defined(slug.current)
    && hidden != true
    && $userId in authors[]._ref 
  ]|order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  "published": publishedAt,
  "updated": _updatedAt,
  "summary": description
}`

export const exchangeParams = {
  userId: `e-cfe6c944570e1d29a8a0a8722108c4af`,
}

export const LEARN_QUERY = groq`
*[_type == "course" && $userId in authors[]._ref]{
  _id,
  _type,
  title,
  slug,
  "summary": description,
  "published": _createdAt
}`

export const learnParams = {
  userId: `ee20547b-3a51-4515-b4d4-dd7461928291`,
}
