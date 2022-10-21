export const projectDetails = () => {
  const {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION} =
    typeof document === 'undefined' ? process.env : window.ENV

  return {
    projectId: SANITY_PROJECT_ID ?? `az8av6xl`,
    dataset: SANITY_DATASET ?? `production`,
    apiVersion: SANITY_API_VERSION ?? `2022-09-23`,
  }
}
