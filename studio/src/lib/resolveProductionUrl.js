const localUrl = `http://localhost:3000`
const remoteUrl = `https://remix.simeongriggs.dev`
const baseUrl = window?.location?.hostname === 'localhost' ? localUrl : remoteUrl

export function resolveProductionUrl(doc) {
  const slug = doc?.slug?.current

  if (!slug) {
    throw new Error(`Document has no slug, cannot preview`)
  }

  const url = new URL(baseUrl)
  url.pathname = slug
  url.searchParams.set(`preview`, `7509tah4ufj80r0cnvxtp5zvln9yhd3fskysj9pkf9peumvf`)

  return url.toString()
}
