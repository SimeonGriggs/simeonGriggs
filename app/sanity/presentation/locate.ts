import groq from 'groq'
import {map} from 'rxjs'
import type {ListenQueryOptions} from 'sanity'
import type {DocumentLocationResolver} from 'sanity/presentation'

// See: https://www.sanity.io/docs/configuring-the-presentation-tool#7dce82cbe90b
export const locate: DocumentLocationResolver = (params, context) => {
  let doc$ = null
  const listenOptions: ListenQueryOptions = {perspective: 'previewDrafts'}

  if (params.type === 'article') {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id && defined(slug.current)][0]{
        title,
        "href": slug.current,
    }`,
      params,
      listenOptions,
    )

    return doc$.pipe(map((doc) => (doc?.href ? {locations: [doc]} : null)))
  }

  return null
}
