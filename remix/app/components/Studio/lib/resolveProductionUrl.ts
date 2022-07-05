import {SanityDocument} from 'sanity'

const localUrl = `http://localhost:3000`
const remoteUrl = `https://www.simeongriggs.dev`
const baseUrl =
  typeof document !== 'undefined' && window?.location?.hostname === 'localhost'
    ? localUrl
    : remoteUrl

export function resolveProductionUrl(doc: SanityDocument) {
  const slug = doc?.slug?.current

  if (!slug) {
    throw new Error(`Document has no slug, cannot preview`)
  }

  const url = new URL(baseUrl)

  switch (doc._type) {
    case `talk`:
      url.pathname = `talk/${slug}`
      break

    default:
      url.pathname = slug
      break
  }

  url.searchParams.set(`preview`, `7509tah4ufj80r0cnvxtp5zvln9yhd3fskysj9pkf9peumvf`)

  return url.toString()
}
