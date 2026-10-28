import {initWasm} from '@resvg/resvg-wasm'
import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm'
import {init} from 'satori/standalone'
import layoutWasm from 'satori/layout.wasm'

// Keep engine initialization separate from templates so editing a card in dev
// does not reinitialize resvg or replace Satori's cached layout engine.
export const enginesReady = Promise.all([init(layoutWasm), initWasm(resvgWasm)])

let fontData: ArrayBuffer[] | undefined

export async function loadOgFonts(assets: Fetcher, origin: string) {
  if (fontData) return fontData
  const loaded = await Promise.all(
    ['Archivo-Regular.ttf', 'JetBrainsMono-Regular.ttf'].map(async (name) => {
      const response = await assets.fetch(new URL(`/fonts/${name}`, origin))
      if (!response.ok) throw new Error(`Unable to load OG font: ${name}`)
      return response.arrayBuffer()
    }),
  )
  fontData = loaded
  return loaded
}
