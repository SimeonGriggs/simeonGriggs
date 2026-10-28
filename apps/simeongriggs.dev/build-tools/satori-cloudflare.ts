import {fileURLToPath} from 'node:url'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, join} from 'node:path'
import type {Plugin} from 'vite'

/**
 * Satori 0.63.2's standalone build externalizes layout.wasm, but its bundled
 * HarfBuzz loader still compiles embedded bytes and assumes self.location.
 * Supply the identical HarfBuzz binary as a Workers-compiled module instead.
 * Keep Satori pinned until upstream exposes a standalone HarfBuzz initializer.
 */
export function satoriCloudflare(): Plugin {
  const wasmPath = fileURLToPath(
    new URL('../app/og/harfbuzz.wasm', import.meta.url),
  )
  const packageRoot = dirname(
    createRequire(import.meta.url).resolve('satori/package.json'),
  )
  const virtualId = '\0satori-cloudflare'
  const entry = join(packageRoot, 'dist/standalone.js')
  const callbacksPath = fileURLToPath(
    new URL('../app/og/harfbuzz-callbacks.ts', import.meta.url),
  )
  return {
    name: 'satori-cloudflare-harfbuzz',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (source === 'satori/standalone') return virtualId
      if (importer === virtualId && !source.startsWith('/')) {
        return this.resolve(source, entry, {skipSelf: true})
      }
    },
    load(id) {
      if (id !== virtualId) return
      const source = readFileSync(entry, 'utf8')
      const init = 'cf().then(e=>{A(af(e))},g)'
      const location = 'B&&(A=self.location.href)'
      const binary = /"AGFzbQ[A-Za-z0-9+/=]+"/
      if (
        !source.includes(init) ||
        !source.includes(location) ||
        !binary.test(source) ||
        !source.includes('new WebAssembly.Module(kA)')
      ) {
        throw new Error(
          'Satori HarfBuzz changed: review the Cloudflare adapter before upgrading Satori.',
        )
      }
      return {
        code:
          `import harfbuzzWasm from ${JSON.stringify(wasmPath)};\nimport harfbuzzCallbacks from ${JSON.stringify(callbacksPath)};\n` +
          source
            .replace(binary, '""')
            .replace(
              'new WebAssembly.Module(kA)',
              '(harfbuzzCallbacks[BA] ?? (()=>{throw new Error("Unsupported HarfBuzz callback signature: "+BA)})())',
            )
            .replace(location, 'B&&(A="")')
            .replace(
              init,
              'cf({instantiateWasm:(imports,done)=>{const instance=new WebAssembly.Instance(harfbuzzWasm,imports);done(instance,harfbuzzWasm);return instance.exports}}).then(e=>{try{A(af(e))}catch(error){g(error)}},g)',
            ),
        map: null,
      }
    },
  }
}
