import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'

import {og} from './og'
import HeroIcon from '../components/HeroIcon'

export const structure: StructureResolver = (S, {currentUser}) => {
  const items = [
    S.documentTypeListItem('article').title('Articles'),
    S.documentTypeListItem('talk').title('Talks'),
    S.documentTypeListItem('youTubeVideo')
      .title('Videos')
      .icon(() => HeroIcon({icon: 'youtube'})),
    S.documentTypeListItem('siteMeta').title('Site Meta'),
    S.divider(),
    S.documentTypeListItem('playbook').title('Playbooks'),
    S.divider(),
    S.documentTypeListItem('tailwind').title('Tailwind'),
  ]

  if (currentUser?.id) {
    items.splice(1, 0, S.documentTypeListItem('comment').title('Comments'))
  }

  return S.list().id('root').title('Content').items(items)
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType},
) => {
  switch (schemaType) {
    case `article`:
      return S.document().views([S.view.form(), og(S)])
    default:
      return S.document().views([S.view.form()])
  }
}
