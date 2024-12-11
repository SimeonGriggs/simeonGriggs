import path from 'path'
import {createHash} from 'crypto'
import fs from 'fs/promises'
import type {PluginOption} from 'vite'

// https://github.com/vitejs/vite/issues/14289#issuecomment-2428496718
export function nativeFilesPlugin(): PluginOption {
  const files = new Map<string, {readonly fileName: string; readonly fileContent: Buffer}>()

  return {
    name: 'node-binaries-plugin',
    async load(id) {
      if (!id.endsWith('.node')) {
        return null
      }

      const fileContent = await fs.readFile(id)
      const hash = createHash('sha256').update(fileContent).digest('hex').slice(0, 8)
      const fileName = `${path.basename(id, '.node')}.${hash}.node`
      files.set(id, {fileName, fileContent})

      // Use `new URL()` with `import.meta.url` to resolve the path dynamically
      return `export default await import(${new URL('./${fileName}', import.meta.url)});`
    },

    generateBundle(_, bundle) {
      for (const [id, {fileName, fileContent}] of files.entries()) {
        this.emitFile({
          type: 'asset',
          fileName, // This will emit the file in the root of the output directory
          source: fileContent,
        })

        // Optional: Delete the original entry if necessary
        delete bundle[id]
      }
    },
  }
}
