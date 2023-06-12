import type {CurrentUser, SanityClient, SanityDocumentLike} from 'sanity'
import type {StructureBuilder} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'

import {getSecret, SECRET_ID} from './getSecret'

async function createPreviewUrl(
  doc: {[key: string]: any},
  client: SanityClient,
  user: CurrentUser | null
) {
  const remoteUrl = `https://www.simeongriggs.dev`
  const baseUrl = window?.location?.hostname === 'localhost' ? window.origin : remoteUrl

  // If no user, we're not logged in, so we can't preview a draft
  if (!user) {
    return doc?.slug?.current ? new URL(doc.slug.current, baseUrl).toString() : baseUrl
  }

  const previewUrl = new URL('/resource/preview', baseUrl)

  if (!doc?.slug?.current) {
    return previewUrl.toString()
  }

  previewUrl.searchParams.set('slug', doc.slug.current)
  const secret = await getSecret(client, SECRET_ID, true)

  if (secret) {
    previewUrl.searchParams.set('secret', secret)
  }

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
