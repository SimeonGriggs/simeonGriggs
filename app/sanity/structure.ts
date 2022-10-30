import type {StructureResolver, DefaultDocumentNodeResolver} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
import type {SanityDocumentLike} from 'sanity'
import type {SanityImageObjectStub} from '@sanity/asset-utils'

import {urlFor} from './helpers'

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

type DocProps = {
  title?: string
  published?: string
  updated?: string
  image?: SanityImageObjectStub
}

function createOgUrl(doc: DocProps) {
  const {title, published, updated, image} = doc

  const localUrl = `http://localhost:3000`
  const remoteUrl = `https://og-simeongriggs.vercel.app`
  const baseUrl = window?.location?.hostname === 'localhost' ? localUrl : remoteUrl
  const urlBase = new URL(baseUrl)
  urlBase.searchParams.set('title', title ?? ``)
  urlBase.searchParams.set('published', published ?? ``)
  urlBase.searchParams.set('published', updated ?? ``)

  if (image?.asset) {
    urlBase.searchParams.set(
      'imageUrl',
      urlFor(image.asset).width(400).height(630).auto('format').toString()
    )
  }

  return urlBase.toString()
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `article`:
      return S.document().views([
        S.view.form(),
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
          }),
        S.view
          .component(Iframe)
          .title('OG Preview')
          .options({
            id: 'og',
            url: (doc: DocProps) => createOgUrl(doc),
            reload: {
              revision: true,
              button: true,
            },
          }),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
