import SanityClient from '@sanity/client'

import {projectDetails} from './projectDetails'

export const client = new SanityClient({
  ...projectDetails(),
  useCdn: process.env.NODE_ENV === 'production',
})

export const previewClient = new SanityClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (previewMode = false) => (previewMode ? previewClient : client)

export const writeClient = new SanityClient({
  ...projectDetails(),
  token: process.env.SANITY_API_TOKEN,
})

export const exchangeClient = new SanityClient({
  ...projectDetails(),
  projectId: `81pocpw8`,
  useCdn: process.env.NODE_ENV === 'production',
})
