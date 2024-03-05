import type {CurrentUser, SanityClient, SanityDocumentLike} from 'sanity'
import type {StructureBuilder} from 'sanity/structure'
import Iframe from 'sanity-plugin-iframe-pane'

import {getSecret, SECRET_ID} from './getSecret'

async function createPreviewUrl(
  doc: {[key: string]: any},
  client: SanityClient,
  user: CurrentUser | null
) {
  const previewUrl = new URL('/resource/preview', window.origin)
  const secret = await getSecret(client, SECRET_ID, true)

  previewUrl.searchParams.set('_id', doc._id.replace(`drafts.`, ``))
  previewUrl.searchParams.set('secret', secret ?? ``)

  return previewUrl.toString()
}

export const preview = (S: StructureBuilder, client: SanityClient, user: CurrentUser | null) =>
  S.view
    .component(Iframe)
    .title('Preview')
    .options({
      id: 'preview',
      url: (doc: SanityDocumentLike) => createPreviewUrl(doc, client, user),
      reload: {button: true},
    })
