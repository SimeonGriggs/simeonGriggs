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

      return `export default require('./${fileName}');`
    },

    generateBundle(_, bundle) {
      for (const [id, {fileName, fileContent}] of files.entries()) {
        this.emitFile({type: 'asset', fileName, source: fileContent})
        delete bundle[id]
      }
    },
  }
}
