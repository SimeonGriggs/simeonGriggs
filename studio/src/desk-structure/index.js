import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'

import {resolveProductionUrl} from '../lib/resolveProductionUrl'

export const getDefaultDocumentNode = ({schemaType}) => {
  if (schemaType === `article`) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          // Required: Accepts an async function
          url: (doc) => resolveProductionUrl(doc),
          // defaultSize: `mobile`,
          reload: {button: true},
        })
        .title('Preview'),
    ])
  }

  return S.document()
}

const items = [
  S.documentTypeListItem('article').title('Articles'),
  S.documentTypeListItem('comment').title('Comments'),
  S.divider(),
  S.documentListItem().schemaType(`siteMeta`).id(`siteMeta`).title(`Site Meta`),
  S.divider(),
  S.documentListItem().schemaType(`tailwind`).id(`tailwind`).title(`Tailwind`),
  // ...S.documentTypeListItems().filter((listItem) => !['article'].includes(listItem.getId())),
]

export default () => {
  return S.list().title('Content').items(items)
}
