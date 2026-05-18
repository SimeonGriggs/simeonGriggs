import {createClient} from '@sanity/client'

import type {AppEnv} from '~/env.server'
import {getRequiredEnvValue} from '~/env.server'
import {client} from './client'

export const exchangeClient = createClient({
  ...client.config(),
  projectId: `81pocpw8`,
  useCdn: import.meta.env.PROD,
})

export const adminClient = createClient({
  ...client.config(),
  projectId: `3do82whm`,
  dataset: `next`,
  useCdn: import.meta.env.PROD,
})

export function getWriteClient(env: AppEnv) {
  return createClient({
    ...client.config(),
    useCdn: false,
    token: getRequiredEnvValue(env, 'SANITY_WRITE_TOKEN'),
  })
}
