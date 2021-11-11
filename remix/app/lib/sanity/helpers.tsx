// import {createImageUrlBuilder} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import SanityPortableText from '@sanity/block-content-to-react'

import type {ArticleDocument} from './types'
import {config} from './config'
import {serializers} from './serializers'

export const urlFor = (source: any) => imageUrlBuilder(config).image(source)
// export const urlFor = (source: any) => null

export function PortableText(props) {
  return <SanityPortableText serializers={serializers} {...config} {...props} />
}

// Helper function for using the current logged in user account
// export const useCurrentUser = createCurrentUserHook(config)

// interface UserResponse {
//   id: string
//   name: string
//   email: string
//   profileImage: string
//   role: string
//   provider: string
// }

// Loader-side check to see if you're a logged-in user
// export const checkIfProjectUser = async () => {
//   const url = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/users/me`
//   const data = await fetch(url, {credentials: `include`})
//     .then((res) => res.json())
//     .catch((err) => console.error(err))

//   return data
// }

export function filterDataToSingleItem(data: ArticleDocument[], preview = false) {
  if (!Array.isArray(data)) {
    return data
  }

  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}
