interface ClientConfig {
  dataset: string
  projectId: string
  apiVersion: string
  useCdn: boolean
}

export const config: ClientConfig = {
  // dataset: process.env.SANITY_DATASET || 'production',
  dataset: 'production',

  // projectId: process.env.SANITY_PROJECT_ID || ``,
  projectId: 'az8av6xl',

  apiVersion: '2021-03-25',

  // useCdn: process?.env?.NODE_ENV === 'production',
  useCdn: false,
}
