import {cloudflare} from '@cloudflare/vite-plugin'
import {reactRouter} from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath} from 'node:url'
import {defineConfig, type Plugin} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const tldrawSsrStubPath = fileURLToPath(new URL('./app/stubs/tldraw-ssr.ts', import.meta.url))
const tldrawCssSsrStubPath = fileURLToPath(
  new URL('./app/stubs/tldraw-empty.css', import.meta.url),
)

/**
 * The `tldraw` npm package is one large entry (editor + `TldrawImage`). For Cloudflare Workers
 * we only need read-only images on the client; stub the package during SSR so it is not bundled
 * into the Worker script.
 */
function tldrawSsrStub(): Plugin {
  return {
    name: 'tldraw-ssr-stub',
    enforce: 'pre',
    resolveId(source, _importer, options) {
      if (!options?.ssr) return null
      if (source === 'tldraw') return tldrawSsrStubPath
      if (source === 'tldraw/tldraw.css') return tldrawCssSsrStubPath
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    tldrawSsrStub(),
    cloudflare({viteEnvironment: {name: 'ssr'}}),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
})
