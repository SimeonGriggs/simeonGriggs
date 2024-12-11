import {env} from 'node:process'

import {reactRouterHono} from '@lazuee/react-router-hono'

import {reactRouter} from '@react-router/dev/vite'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouterHono({serverFile: 'src/server/index.ts'}), reactRouter(), tsconfigPaths()],
  ssr: {
    external: ['@resvg/resvg-js', '@mapbox/node-pre-gyp'],
  },
  optimizeDeps: {
    exclude: ['@resvg/resvg-js', '@mapbox/node-pre-gyp'],
  },
})
