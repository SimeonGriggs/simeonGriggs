import {nodePreset, vercelPreset} from '@lazuee/react-router-hono'

// eslint-disable-next-line jsdoc/no-types
/** @param {import("@react-router/dev/config").Config} config */
function defineConfig(config) {
  return config
}

export default defineConfig({
  // appDirectory: 'src/client',
  future: {
    unstable_optimizeDeps: true,
  },
  presets: [nodePreset(), vercelPreset({regions: 'hnd1'})],
})
