export function resolveProductionUrl(doc) {
  const slug = doc?.slug?.current
  const url = new URL(`http://localhost:3000`)
  url.pathname = slug
  url.searchParams.set(`preview`, `true`)

  return url.toString()
}
