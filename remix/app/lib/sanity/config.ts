interface ClientConfig {
  dataset: string
  projectId: string
  apiVersion: string
  useCdn: boolean
}

// _probably_ a way to actually pull these from the getEnv.ts file
type EnvKey = 'NODE_ENV' | 'SANITY_DATASET' | 'SANITY_PROJECT_ID'

function getEnvByKey(key: EnvKey) {
  return typeof document === 'undefined' ? process.env[key] : window?.ENV[key]
}

export const config: ClientConfig = {
  apiVersion: '2021-03-25',
  dataset: getEnvByKey(`SANITY_DATASET`) ?? `production`,
  projectId: getEnvByKey(`SANITY_PROJECT_ID`) ?? `az8av6xl`,
  useCdn: getEnvByKey(`NODE_ENV`) === 'production',
  // dataset: `production`,
  // projectId: `az8av6xl`,
  // useCdn: true,
}
