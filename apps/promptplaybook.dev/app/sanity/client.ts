import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'az8av6xl',
  dataset: 'production',
  apiVersion: '2025-09-05',
  useCdn: true,
})
