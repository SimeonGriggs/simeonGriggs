import Iframe from 'sanity-plugin-iframe-pane'
import {StructureResolver, DefaultDocumentNodeResolver} from 'sanity/desk'
import {BeakerIcon} from '@heroicons/react/solid'

import {resolveProductionUrl} from '../lib/resolveProductionUrl'
import HeroIcon from '../components/HeroIcon'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if ([`article`, `talk`].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
          reload: {button: true},
        })
        .title('Preview'),
    ])
  }

  return S.document()
}

export const structure: StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Articles')
        .schemaType('article')
        .child(S.documentList().title('Articles').filter('_type == "article" && unlisted != true')),
      S.listItem()
        .title('Unlisted')
        .schemaType('article')
        .icon(() => <HeroIcon icon="unlisted" />)
        .child(
          S.documentList().title('Unlisted Articles').filter('_type == "article" && unlisted')
        ),
      S.documentTypeListItem('comment').title('Comments'),
      S.divider(),
      S.documentTypeListItem('talk').title('Talks'),
      S.divider(),
      S.documentListItem().schemaType(`siteMeta`).id(`siteMeta`).title(`Site Meta`),
      S.divider(),
      S.documentListItem().schemaType(`tailwind`).id(`tailwind`).title(`Tailwind`),
      // ...S.documentTypeListItems().filter((listItem) => !['article'].includes(listItem.getId())),
    ])
}
