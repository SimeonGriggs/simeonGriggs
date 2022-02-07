import {config} from './config'

export function getUser() {
  return fetch(`https://api.sanity.io/v${config.apiVersion}/users/me`).then((res) => res.json())
}
