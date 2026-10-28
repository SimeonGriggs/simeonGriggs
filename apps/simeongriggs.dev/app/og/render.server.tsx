import {Resvg} from '@resvg/resvg-wasm'
import satori from 'satori/standalone'
import {enginesReady, loadOgFonts} from './engines.server'
import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_NAME} from '@repo/constants'

export type OgContent = {
  title: string
  published?: string | null
  updated?: string | null
  imageUrl?: string
}

export async function renderOgImage(
  content: OgContent,
  assets: Fetcher,
  origin: string,
) {
  await enginesReady
  const fonts = await loadOgFonts(assets, origin)

  const textWidth = OG_IMAGE_WIDTH - (content.imageUrl ? 400 : 0)
  const date = content.updated
    ? `Updated ${content.updated.slice(0, 10)}`
    : (content.published?.slice(0, 10) ?? '')

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        backgroundColor: '#2522fc',
        color: 'white',
      }}
    >
      {content.imageUrl ? (
        <img
          src={content.imageUrl}
          width={400}
          height={630}
          style={{objectFit: 'cover'}}
        />
      ) : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: textWidth,
          flexShrink: 0,
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            fontFamily: 'Archivo',
            fontSize: 76,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            padding: 60,
            overflow: 'hidden',
          }}
        >
          {content.title}
        </div>
        <div
          style={{
            display: 'flex',
            width: textWidth,
            boxSizing: 'border-box',
            backgroundColor: '#0035aa',
            padding: 48,
            fontFamily: 'JetBrains Mono',
            fontSize: 26,
            lineHeight: 1,
          }}
        >
          <div style={{display: 'flex', flex: 1}}>{date}</div>
          <div style={{display: 'flex', flexShrink: 0}}>{SITE_NAME}</div>
        </div>
      </div>
    </div>,
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      fonts: [
        {name: 'Archivo', data: fonts[0], weight: 400, style: 'normal'},
        {name: 'JetBrains Mono', data: fonts[1], weight: 400, style: 'normal'},
      ],
    },
  )
  const renderer = new Resvg(svg)
  const image = renderer.render()
  // wasm-bindgen's registered finalizers release the render objects. Keep them
  // alive while copying the PNG out of Wasm for the response.
  return Uint8Array.from(image.asPng())
}
