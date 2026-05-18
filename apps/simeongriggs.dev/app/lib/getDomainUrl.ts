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
  const isLocalHost = host.includes('localhost') || host.startsWith('127.0.0.1')
  const protocol =
    request.headers.get('X-Forwarded-Proto') ?? (isLocalHost ? 'http' : 'https')

  return `${protocol}://${host}`
}
