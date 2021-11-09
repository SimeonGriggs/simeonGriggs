import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity'
import {config} from './sanityConfig'

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: any) => createImageUrlBuilder(config).image(source)

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
})

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)

// interface UserResponse {
//   id: string
//   name: string
//   email: string
//   profileImage: string
//   role: string
//   provider: string
// }

// Loader-side check to see if you're a logged-in user
export const checkIfProjectUser = async () => {
  const url = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/users/me`
  const data = await fetch(url, {credentials: `include`})
    .then((res) => res.json())
    .catch((err) => console.error(err))

  return data
}
