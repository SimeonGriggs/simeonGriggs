import Iframe from 'sanity-plugin-iframe-pane'
import type {SanityDocumentLike} from 'sanity'
import type {StructureBuilder} from 'sanity/desk'

function createPreviewUrl(doc: {[key: string]: any}) {
  const remoteUrl = `https://www.simeongriggs.dev`
  const baseUrl = window?.location?.hostname === 'localhost' ? window.origin : remoteUrl
  const urlBase = new URL(baseUrl)

  if (doc._id.startsWith(`drafts.`) && doc.slug.current) {
    urlBase.pathname = doc._id
    urlBase.searchParams.set('_rev', doc._rev)
  } else if (doc.slug.current) {
    urlBase.pathname = doc.slug.current
  }

  return urlBase.toString()
}

export const preview = (S: StructureBuilder) =>
  S.view
    .component(Iframe)
    .title('Preview')
    .options({
      id: 'preview',
      url: (doc: SanityDocumentLike) => createPreviewUrl(doc),
      reload: {
        revision: true,
        button: true,
      },
    })
