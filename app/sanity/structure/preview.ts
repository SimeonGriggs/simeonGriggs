import Iframe from 'sanity-plugin-iframe-pane'
import type {SanityClient, SanityDocumentLike} from 'sanity'
import type {StructureBuilder} from 'sanity/desk'
import {getSecret, SECRET_ID} from './getSecret'

async function createPreviewUrl(doc: {[key: string]: any}, client: SanityClient) {
  const remoteUrl = `https://www.simeongriggs.dev`
  const baseUrl = window?.location?.hostname === 'localhost' ? window.origin : remoteUrl
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

export const preview = (S: StructureBuilder, client: SanityClient) =>
  S.view
    .component(Iframe)
    .title('Preview')
    .options({
      id: 'preview',
      url: (doc: SanityDocumentLike) => createPreviewUrl(doc, client),
      reload: {button: true},
    })
