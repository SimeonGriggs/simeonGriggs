import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from '~/sanity/schema'
import {defaultDocumentNode, structure} from '~/sanity/structure'
import {theme} from '~/sanity/theme'
import {projectDetails} from '~/sanity/projectDetails'

export const config = createConfig({
  name: 'simeonGriggs',
  title: 'simeonGriggs.dev',
  theme,
  ...projectDetails(),
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
    codeInput(),
    unsplashImageAsset(),
    media(),
  ],
  basePath: `/studio`,
  schema: {
    types: schemaTypes,
  },
})
