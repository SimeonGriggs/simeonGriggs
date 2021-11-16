interface ClientConfig {
  dataset: string
  projectId: string
  apiVersion: string
  useCdn: boolean
}

export const config: ClientConfig = {
  apiVersion: '2021-03-25',
  dataset: 'production',
  projectId: 'az8av6xl',
  // projectId: process.env.SANITY_PROJECT_ID || ``,
  useCdn: true,
  // useCdn: process.env.NODE_ENV === 'production',
}
