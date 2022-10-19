import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'

import {schemaTypes} from './schema'
import {defaultDocumentNode, structure} from './structure'
import {theme} from './theme'
// import {media} from 'sanity-plugin-media'

export const projectDetails = () => {
  const {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION} =
    typeof document === 'undefined' ? process.env : window.ENV

  return {
    projectId: SANITY_PROJECT_ID ?? `az8av6xl`,
    dataset: SANITY_DATASET ?? `production`,
    apiVersion: SANITY_API_VERSION ?? `2022-09-23`,
  }
}

export const config = createConfig({
  name: 'simeonGriggs',
  theme,
  ...projectDetails(),
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    codeInput(),
    // media()
  ],
  basePath: `/studio`,
  schema: {
    types: schemaTypes,
  },
})
