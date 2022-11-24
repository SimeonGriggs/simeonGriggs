import type {SanityImageObjectStub} from '@sanity/asset-utils'
import Iframe from 'sanity-plugin-iframe-pane'
import type {StructureBuilder} from 'sanity/desk'

import {urlFor} from '../helpers'

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
  urlBase.searchParams.set('updated', updated ?? ``)

  if (image?.asset) {
    urlBase.searchParams.set(
      'imageUrl',
      urlFor(image.asset).width(400).height(630).auto('format').toString()
    )
  }

  return urlBase.toString()
}

export const og = (S: StructureBuilder) =>
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
    })
