export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    SANITY_PUBLIC_PROJECT_ID: process.env.SANITY_PUBLIC_PROJECT_ID,
    SANITY_PUBLIC_DATASET: process.env.SANITY_PUBLIC_DATASET,
    SANITY_PUBLIC_API_VERSION: process.env.SANITY_PUBLIC_API_VERSION,
  }
}

type ENV = ReturnType<typeof getEnv>

declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}
