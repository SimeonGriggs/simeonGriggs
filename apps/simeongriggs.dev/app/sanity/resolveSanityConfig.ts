import type {AppEnv} from '~/env.server'

export type SanityPublicConfig = {
  projectId: string
  dataset: string
  apiVersion: string
}

/** Resolve per request: Worker bindings take precedence over build-time values. */
export function resolveSanityConfig(env: AppEnv): SanityPublicConfig {
  const projectId =
    env.VITE_SANITY_PROJECT_ID || import.meta.env?.VITE_SANITY_PROJECT_ID
  const dataset =
    env.VITE_SANITY_DATASET || import.meta.env?.VITE_SANITY_DATASET
  const apiVersion =
    env.VITE_SANITY_API_VERSION ||
    import.meta.env?.VITE_SANITY_API_VERSION ||
    '2024-02-13'

  if (!projectId || !dataset) {
    throw new Error(
      'Missing Sanity configuration. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET as Worker variables or local .dev.vars.',
    )
  }

  return {projectId, dataset, apiVersion}
}
