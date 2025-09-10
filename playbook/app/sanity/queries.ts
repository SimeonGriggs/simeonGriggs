import {defineQuery} from 'groq'

export const HOME_QUERY = defineQuery(`
  *[_type == "playbook" && visibility == "home"][0]{
    _id,
    title,
    summary,
    content
  }
`)
