import {projectId, apiUrl, apiVersion, dataset} from './sanityConfig'

const url = new URL(`https://${projectId}.${apiUrl}/${apiVersion}/data/query/${dataset}`)

export async function sanityFetch(query = ``, params = {}) {
  const queryUrl = url
  queryUrl.searchParams.set(`query`, query)

  if (Object.keys(params).length) {
    Object.keys(params).forEach((key) => {
      queryUrl.searchParams.set(`$${key}`, JSON.stringify(params[key]))
    })
  }

  const response = await fetch(queryUrl.toString())
    .then((res) => res.json())
    .catch((err) => console.error(err))

  return response?.result ?? null
}
