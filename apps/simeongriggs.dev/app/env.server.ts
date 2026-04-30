export interface AppEnv {
  SANITY_READ_TOKEN?: string
  SANITY_WRITE_TOKEN?: string
  SANITY_SESSION_SECRET?: string
}

interface CloudflareContext {
  cloudflare?: {
    env?: AppEnv
  }
}

export function getEnv(context: unknown): AppEnv {
  const env = (context as CloudflareContext | undefined)?.cloudflare?.env

  if (!env) {
    throw new Error(
      'Missing Cloudflare environment bindings. Run the app with the Cloudflare Vite plugin or Workers runtime.',
    )
  }

  return env
}

export function getRequiredEnvValue(
  env: AppEnv,
  key: keyof AppEnv,
): string {
  const value = env[key]

  if (!value) {
    throw new Error(`Missing ${key} binding in the Cloudflare environment`)
  }

  return value
}
