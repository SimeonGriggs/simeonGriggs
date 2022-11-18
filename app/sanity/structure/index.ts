import type {StructureResolver, DefaultDocumentNodeResolver} from 'sanity/desk'

import {preview} from './preview'
import {og} from './og'
import {projectDetails} from '../projectDetails'

export const structure: StructureResolver = (S, {currentUser}) => {
  const items = [
    S.documentTypeListItem('article').title('Articles'),
    S.documentTypeListItem('talk').title('Talks'),
    S.divider(),
    S.documentTypeListItem('siteMeta').title('Site Meta'),
    S.divider(),
    S.documentTypeListItem('tailwind').title('Tailwind'),
  ]

  if (currentUser?.id) {
    items.splice(1, 0, S.documentTypeListItem('comment').title('Comments'))
  }

  return S.list().id('root').title('Content').items(items)
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType, getClient}) => {
  const {apiVersion} = projectDetails()
  const client = getClient({apiVersion})

  switch (schemaType) {
    case `article`:
      return S.document().views([S.view.form(), preview(S, client), og(S)])
    default:
      return S.document().views([S.view.form()])
  }
}
