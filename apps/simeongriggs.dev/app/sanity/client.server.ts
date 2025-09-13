import {createClient} from '@sanity/client'

import {client} from './client'

export const exchangeClient = createClient({
  ...client.config(),
  projectId: `81pocpw8`,
  useCdn: process.env.NODE_ENV === 'production',
})

export const adminClient = createClient({
  ...client.config(),
  projectId: `3do82whm`,
  dataset: `next`,
  useCdn: process.env.NODE_ENV === 'production',
})

export const writeClient = createClient({
  ...client.config(),
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
