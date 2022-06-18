// The 'next-sanity' implementation uses the full @sanity/client
// Since we don't need to do mutation, we can just use PicoSanity instead
// (Also, @sanity/client was giving me drama)
import PicoSanity from 'picosanity'

import {config} from './config'

// Set up the client for fetching data in the getProps page functions
export const sanityClient = new PicoSanity(config)

// Set up a preview client with serverless authentication for drafts
export const previewClient = new PicoSanity({
  ...config,
  useCdn: false,
  token: typeof document === 'undefined' && process ? process.env.SANITY_API_TOKEN : ``,
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview = false) => (usePreview ? previewClient : sanityClient)

// Quick client for querying community posts
export const communityClient = new PicoSanity({...config, projectId: `81pocpw8`})
