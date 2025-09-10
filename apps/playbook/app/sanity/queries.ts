import {defineQuery} from 'groq'

export const HOME_QUERY = defineQuery(`
  *[_type == "playbook" && visibility == "home"][0]{
    _id,
    title,
    summary,
    content,
    "_playbooks": *[_type == "playbook" && visibility != "hidden"]|order(orderRank asc){
      _id,
      title,
      slug,
      summary,
      content,
      visibility
    }
  }
`)
