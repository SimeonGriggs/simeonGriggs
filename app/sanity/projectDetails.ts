type ProjectDetails = {
  projectId: string
  dataset: string
  apiVersion: string
}

export const projectDetails = (): ProjectDetails => {
  const {
    VITE_SANITY_PUBLIC_PROJECT_ID,
    VITE_SANITY_PUBLIC_DATASET,
    VITE_SANITY_PUBLIC_API_VERSION,
  } = typeof document === 'undefined' ? process.env : window.ENV

  // Check values
  if (!VITE_SANITY_PUBLIC_PROJECT_ID) {
    throw new Error(`Undefined environment variable: VITE_SANITY_PUBLIC_PROJECT_ID`)
  } else if (!VITE_SANITY_PUBLIC_DATASET) {
    throw new Error(`Undefined environment variable: VITE_SANITY_PUBLIC_DATASET`)
  } else if (!VITE_SANITY_PUBLIC_API_VERSION) {
    throw new Error(`Undefined environment variable: VITE_SANITY_PUBLIC_API_VERSION`)
  }

  return {
    projectId: VITE_SANITY_PUBLIC_PROJECT_ID,
    dataset: VITE_SANITY_PUBLIC_DATASET,
    apiVersion: VITE_SANITY_PUBLIC_API_VERSION,
  }
}
