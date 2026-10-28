import {createClient} from '@sanity/client'

import {getEnv, getRequiredEnvValue} from '~/env.server'
import {resolveSanityConfig} from './resolveSanityConfig'

export function getSanityClient(context: unknown) {
  return createClient({
    ...resolveSanityConfig(getEnv(context)),
    useCdn: import.meta.env.PROD,
    perspective: 'published',
  })
}

export function getWriteClient(context: unknown) {
  return getSanityClient(context).withConfig({
    useCdn: false,
    token: getRequiredEnvValue(getEnv(context), 'SANITY_WRITE_TOKEN'),
  })
}
