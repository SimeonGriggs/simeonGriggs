const localUrl = `http://localhost:3000`
const remoteUrl = `https://fragrant-resonance-1495.fly.dev`
const baseUrl = window?.location?.hostname === 'localhost' ? localUrl : remoteUrl

export function resolveProductionUrl(doc) {
  const slug = doc?.slug?.current
  const url = new URL(baseUrl)
  url.pathname = slug
  url.searchParams.set(`preview`, `true`)

  return url.toString()
}
