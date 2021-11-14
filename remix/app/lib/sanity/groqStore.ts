import {groqStore, GroqStore} from '@sanity/groq-store'

import {config} from './config'

const {projectId, dataset} = config

export const store = (enabled = false): GroqStore | null =>
  enabled
    ? groqStore({
        projectId,
        dataset,

        // Keep dataset up to date with remote changes. Default: false
        listen: true,

        // "Replaces" published documents with drafts, if available.
        // Note that document IDs will not reflect draft status, currently
        overlayDrafts: true,

        // Optional token, if you want to receive drafts, or read data from private datasets
        // NOTE: Does _not_ work in browsers (yet)
        //   token: "someAuthToken",

        // Optional limit on number of documents, to prevent using too much memory unexpectedly
        // Throws on the first operation (query, retrieval, subscription) if reaching this limit.
        documentLimit: 1000,
      })
    : null
