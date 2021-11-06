export function resolveProductionUrl(doc) {
  const slug = doc?.slug?.current
  const url = new URL(`http://localhost:3000`)
  url.pathname = slug

  return url.toString()
}
