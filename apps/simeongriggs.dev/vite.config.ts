import path from 'node:path'
import {createRequire} from 'node:module'
import {cloudflare} from '@cloudflare/vite-plugin'
import {reactRouter} from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const require = createRequire(import.meta.url)
const sanityReactLoaderServerEntry = path.join(
  path.dirname(require.resolve('@sanity/react-loader/package.json')),
  'dist/index.js',
)

export default defineConfig({
  plugins: [
    cloudflare({viteEnvironment: {name: 'ssr'}}),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ['@sanity/react-loader'],
  },
  resolve: {
    alias: [
      {
        find: '@sanity/react-loader',
        replacement: sanityReactLoaderServerEntry,
        customResolver(_source, importer, options) {
          return options?.ssr ? sanityReactLoaderServerEntry : null
        },
      },
    ],
  },
})
