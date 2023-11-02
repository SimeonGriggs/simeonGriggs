import {createClient} from '@sanity/client'

import {projectDetails} from './projectDetails'

export const client = createClient({
  ...projectDetails(),
  useCdn: process.env.NODE_ENV === 'production',
})

export const previewClient = createClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
  perspective: 'previewDrafts',
})

export const getClient = (previewMode = false) => (previewMode ? previewClient : client)

export const writeClient = createClient({
  ...projectDetails(),
  token: process.env.SANITY_WRITE_TOKEN,
})

export const exchangeClient = createClient({
  ...projectDetails(),
  projectId: `81pocpw8`,
  useCdn: process.env.NODE_ENV === 'production',
})
