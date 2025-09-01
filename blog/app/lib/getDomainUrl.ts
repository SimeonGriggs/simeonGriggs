/**
 * @returns domain URL (without a ending slash, like: https://kentcdodds.com)
 * https://github.com/kentcdodds/kentcdodds.com/blob/main/app/utils/misc.tsx
 */
export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
  if (!host) {
    throw new Error('Could not determine domain URL.')
  }
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const productionHost = host.includes('vercel.app')
    ? 'www.simeongriggs.dev'
    : host
  return `${protocol}://${productionHost}`
}
