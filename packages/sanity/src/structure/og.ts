import {type SanityDocument, isDev} from 'sanity'
import type {StructureBuilder} from 'sanity/structure'
import {LOCAL_OG_URL, PROD_OG_URL} from '@repo/constants'

import OGPreview from '../components/OGPreview'

type DocProps = SanityDocument

function createOgUrl(doc: DocProps) {
  const urlBase = new URL(`/image`, isDev ? LOCAL_OG_URL : PROD_OG_URL)
  urlBase.searchParams.set('id', doc._id)
  urlBase.searchParams.set('updatedAt', doc._updatedAt)

  return urlBase.toString()
}

export const og = (S: StructureBuilder) =>
  S.view
    .component(OGPreview)
    .title('OG Preview')
    .options({
      id: 'og',
      url: (doc: DocProps) => createOgUrl(doc),
    })
