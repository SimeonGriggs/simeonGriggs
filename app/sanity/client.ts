import SanityClient from '@sanity/client'

import {projectDetails} from './config'

export const client = new SanityClient({
  ...projectDetails(),
  useCdn: process.env.NODE_ENV === 'production',
})

export const writeClient = new SanityClient({
  ...projectDetails(),
  token: process.env.SANITY_API_TOKEN,
})

export const exchangeClient = new SanityClient({
  ...projectDetails(),
  projectId: `81pocpw8`,
  useCdn: process.env.NODE_ENV === 'production',
})
