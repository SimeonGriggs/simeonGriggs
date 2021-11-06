import { groq } from "@sanity/groq-store";

export const siteMetaQuery = groq`*[_id == "siteMeta"][0]`;

export const articleQuery = groq`*[_type == "article" && slug.current == $slug][0]{
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
    }
  }`;

export const homeQuery = groq`*[_type == "article" && defined(slug.current)]|order(published desc){
    _id,
    title,
    "slug": slug.current,
    published,
    updated,
    summary,
    image {
      ...,
      asset->
    }
  }`;
