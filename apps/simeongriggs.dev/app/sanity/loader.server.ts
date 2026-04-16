import {STUDIO_BASEPATH} from '../../../../packages/constants/src'

import type {AppEnv} from '~/env.server'
import {getRequiredEnvValue} from '~/env.server'
import {client} from '~/sanity/client'
import {loadQuery, setServerClient} from '~/sanity/loader'

export function loadServerQuery(
  ...[query, params, options, env]: [
    Parameters<typeof loadQuery>[0],
    Parameters<typeof loadQuery>[1],
    Parameters<typeof loadQuery>[2],
    AppEnv,
  ]
) {
  const previewEnabled =
    options?.perspective === 'previewDrafts' ||
    options?.perspective === 'drafts' ||
    Array.isArray(options?.perspective)

  const serverClient = previewEnabled
    ? client.withConfig({
        token: getRequiredEnvValue(env, 'SANITY_READ_TOKEN'),
        stega: {
          studioUrl: STUDIO_BASEPATH,
        },
      })
    : client

  setServerClient(serverClient)

  return loadQuery(query, params, options)
}
