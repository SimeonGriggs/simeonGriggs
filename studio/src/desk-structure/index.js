import S from '@sanity/desk-tool/structure-builder'

export const getDefaultDocumentNode = ({schemaType}) => {
  if (schemaType === `article`) {
    return S.document().views([
      S.view.form(),
      // ...and other views
    ])
  }

  return S.document()
}

const items = [
  S.documentTypeListItem('article').title('Articles'),
  S.documentListItem().schemaType(`siteMeta`).id(`siteMeta`).title(`Site Meta`),
  // ...S.documentTypeListItems().filter((listItem) => !['article'].includes(listItem.getId())),
]

export default () => {
  return S.list().title('Content').items(items)
}
