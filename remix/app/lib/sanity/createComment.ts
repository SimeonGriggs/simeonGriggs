import {config} from './config'
import {CommentDocument} from './types'

export async function createComment(comment: CommentDocument) {
  const mutations = [{createOrReplace: comment}]

  const {projectId, apiVersion, dataset} = config
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`

  const init = {
    method: `POST`,
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      'Content-Type': `application/json`,
    },
    body: JSON.stringify({mutations}),
  }

  const data = await fetch(url, init)
    .then((res) => res.json())
    .catch((res) => {
      console.error(res)
    })

  // console.log(data)

  return data
}
