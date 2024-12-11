import {reactRouter} from '@react-router/dev/vite'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {nativeFilesPlugin} from './app/nativeFilesPlugin'

export default defineConfig(({isSsrBuild, command}) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: './server/app.ts',
          output: {
            format: 'cjs', // Set the output format to CommonJS
            entryFileNames: '[name].cjs', // Use .cjs extension for output files
          },
        }
      : undefined,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  assetsInclude: ['**/*.node'], // Treat .node files as assets
  ssr: {
    // external: command === 'build' ? ['@resvg/resvg-js'] : undefined,
    noExternal: command === 'build' ? true : undefined,
  },
  plugins: [reactRouter(), tsconfigPaths(), nativeFilesPlugin()],
}))
