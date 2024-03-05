export function getEnv() {
  const values: Record<string, string | undefined> = {
    NODE_ENV: process.env.NODE_ENV,
    VITE_SANITY_PUBLIC_PROJECT_ID: process.env.VITE_SANITY_PUBLIC_PROJECT_ID,
    VITE_SANITY_PUBLIC_DATASET: process.env.VITE_SANITY_PUBLIC_DATASET,
    VITE_SANITY_PUBLIC_API_VERSION: process.env.VITE_SANITY_PUBLIC_API_VERSION,
  }

  // Check values aren't undefined
  for (const key in values) {
    if (!values[key]) {
      throw new Error(`Undefined environment variable: ${key}`)
    }
  }

  return values
}

type ENV = ReturnType<typeof getEnv>

declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}
