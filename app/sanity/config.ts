import {codeInput} from '@sanity/code-input'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
// import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'
import {tldraw} from 'sanity-plugin-tldraw'

import {locate} from '~/sanity/presentation/locate'
import {projectDetails} from '~/sanity/projectDetails'
import {schemaTypes} from '~/sanity/schema'
import {defaultDocumentNode, structure} from '~/sanity/structure'

export const config = defineConfig({
  name: 'simeonGriggs',
  title: 'simeonGriggs.dev',

  ...projectDetails(),
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: `/resource/preview`,
        },
      },
    }),
    tldraw(),
    visionTool(),
    codeInput(),
    // unsplashImageAsset(),
    media(),
  ],
  basePath: `/studio`,
  schema: {
    types: schemaTypes,
  },
})
