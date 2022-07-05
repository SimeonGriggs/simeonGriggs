import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

// import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
// import {codeInput} from '@sanity/code-input'

import {SANITY_DATASET, SANITY_PROJECT_ID} from '~/sanity'
import {structure, defaultDocumentNode} from '~/components/Studio/structure'
import {schemaTypes} from '~/components/Studio/schema'

export default createConfig({
  name: 'simeonGriggs.dev',
  basePath: '/studio',

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  plugins: [
    deskTool({structure, defaultDocumentNode}),
    // codeInput(),
    // unsplashImageAsset()
  ],

  schema: {
    types: schemaTypes,
  },
})
