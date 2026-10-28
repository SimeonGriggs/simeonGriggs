export interface AppEnv {
  SANITY_READ_TOKEN?: string
  SANITY_WRITE_TOKEN?: string
  SANITY_SESSION_SECRET?: string
  VITE_SANITY_PROJECT_ID?: string
  VITE_SANITY_DATASET?: string
  VITE_SANITY_API_VERSION?: string
}

interface CloudflareContext {
  cloudflare?: {
    env?: AppEnv
  }
}

export function getEnv(context: unknown): AppEnv {
  if (!context || typeof context !== 'object') {
    throw new Error(
      'Missing Cloudflare environment bindings. Run the app with the Cloudflare Vite plugin or Workers runtime.',
    )
  }

  const ctx = context as CloudflareContext & {env?: AppEnv}
  const env = ctx.cloudflare?.env ?? ctx.env

  if (!env) {
    throw new Error(
      'Missing Cloudflare environment bindings. Run the app with the Cloudflare Vite plugin or Workers runtime.',
    )
  }

  return env
}

export function getRequiredEnvValue(env: AppEnv, key: keyof AppEnv): string {
  const value = env[key]

  if (!value) {
    throw new Error(`Missing ${key} binding in the Cloudflare environment`)
  }

  return value
}
