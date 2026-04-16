import * as queryStore from '@sanity/react-loader'
import {STUDIO_BASEPATH} from '../../../../packages/constants/src'

import type {AppEnv} from '~/env.server'
import {getRequiredEnvValue} from '~/env.server'
import {client} from '~/sanity/client'

export function loadQuery(
  ...[query, params, options, env]: [
    Parameters<typeof queryStore.loadQuery>[0],
    Parameters<typeof queryStore.loadQuery>[1],
    Parameters<typeof queryStore.loadQuery>[2],
    AppEnv,
  ]
) {
  const clientWithToken = client.withConfig({
    token: getRequiredEnvValue(env, 'SANITY_READ_TOKEN'),
    stega: {
      studioUrl: STUDIO_BASEPATH,
    },
  })

  queryStore.setServerClient(clientWithToken)

  return queryStore.loadQuery(query, params, options)
}
