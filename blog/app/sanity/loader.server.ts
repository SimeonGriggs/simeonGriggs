import * as queryStore from '@sanity/react-loader'
import {STUDIO_BASEPATH} from '@repo/constants'

import {client} from '~/sanity/client'

// In a perfect world, these could be dynamic based on the Request
// But because middleware hasn't landed in Remix
// And server.ts's context is messy to configure (except in Hydrogen!)
// We're overriding these in loadQueryOptions in every loader
const clientWithToken = client.withConfig({
  // Token required for when previewDrafts perspective is set in a loader
  token: process.env.SANITY_READ_TOKEN,
  // You do not want this enabled in production
  // This should be overridden when using loadQuery in a loader
  stega: {
    studioUrl: STUDIO_BASEPATH,
  },
})

queryStore.setServerClient(clientWithToken)

export const {loadQuery} = queryStore
