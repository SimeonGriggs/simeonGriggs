import 'tldraw/tldraw.css'

import {codeInput} from '@sanity/code-input'
import {visionTool} from '@sanity/vision'
import {defineConfig, isDev} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'
import {tldraw} from 'sanity-plugin-tldraw'
import {LOCAL_URL, SITE_URL} from '@repo/constants'
import {youTubeDocuments} from 'sanity-plugin-youtube-documents'

import {resolve} from './presentation/resolve'
import {schemaTypes} from './schema'
import {defaultDocumentNode, structure} from './structure'

export default defineConfig({
  name: 'simeonGriggs',
  title: 'simeonGriggs.dev',
  projectId: 'az8av6xl',
  dataset: 'production',
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: new URL(`/resource/preview`, isDev ? LOCAL_URL : SITE_URL).toString(),
        },
      },
    }),
    tldraw(),
    visionTool(),
    codeInput(),
    unsplashImageAsset(),
    media(),
    youTubeDocuments(),
  ],
  schema: {
    types: schemaTypes,
  },
  tools: (prev, context) =>
    prev.filter((tool) => {
      if (tool.name === 'schedules') {
        return false
      } else if (!context.currentUser && tool.name === 'presentation') {
        return false
      }
      return true
    }),
})
