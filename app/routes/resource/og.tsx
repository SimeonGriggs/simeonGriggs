import type {LoaderArgs} from '@remix-run/node'
import {Resvg} from '@resvg/resvg-js'
import type {SanityDocument} from '@sanity/client'
import type {SatoriOptions} from 'satori'
import satori from 'satori'

import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/constants'
import {previewClient} from '~/sanity/client'
import {urlFor} from '~/sanity/helpers'

const fontMono = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/JetBrainsMono-Regular.ttf`)).then((res) => res.arrayBuffer())
const fontSans = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/Inter-ExtraBold.otf`)).then((res) => res.arrayBuffer())

const BLUE = `#2522fc`
const BLUE_600 = `#0703d8`

const DEFAULT_CONTENT = {
  title: `Hello, internet!`,
  published: ``,
  updated: ``,
  image: ``,
}

export const loader = async ({request}: LoaderArgs) => {
  // Check for valid id in request url search params
  const searchParams = new URL(request.url).searchParams
  const id = searchParams.get('id')

  const doc: SanityDocument | null = await previewClient.fetch(`*[_id == $id][0]`, {id})

  if (id && !doc) {
    return new Response('Document not found with this ID', {status: 400})
  }

  const requestOrigin = new URL(request.url).origin
  const fontMonoData = await fontMono(requestOrigin)
  const fontSansData = await fontSans(requestOrigin)
  const options: SatoriOptions = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      {
        name: 'JetBrains Mono',
        data: fontMonoData,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: fontSansData,
        style: 'normal',
      },
    ],
  }

  const {title, published, updated, image} = doc || DEFAULT_CONTENT

  let imageUrl
  if (image?.asset) {
    imageUrl = urlFor(image.asset).width(400).height(OG_IMAGE_HEIGHT).auto('format').toString()
  }

  const svg = await satori(
    <div
      style={{
        width: options.width,
        height: options.height,
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        {imageUrl ? (
          <div
            style={{
              display: 'flex',
              width: 400,
              height: 630,
            }}
          >
            <img
              src={imageUrl}
              alt=""
              style={{
                backgroundColor: BLUE,
                width: 400,
                height: `100%`,
              }}
              width="400"
              height="630"
            />
          </div>
        ) : (
          <div />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            background: BLUE,
            height: `100%`,
          }}
        >
          <div
            style={{
              letterSpacing: '-0.04em',
              flex: 1,
              color: 'white',
              fontFamily: 'Inter',
              lineHeight: 1,
              fontSize: 76,
              padding: 60,
              paddingRight: 120,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: imageUrl ? 800 : OG_IMAGE_WIDTH,
              backgroundColor: BLUE_600,
              color: 'white',
              padding: 60,
              lineHeight: 1,
            }}
          >
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 30,
                lineHeight: 1,
                flex: 1,
              }}
            >
              {published && !updated ? published : updated ? `Updated ${updated}` : ``}
            </div>
            <div
              style={{
                fontFamily: 'Inter',
                fontSize: 30,
              }}
            >
              simeonGriggs.dev
            </div>
          </div>
        </div>
      </div>
    </div>,
    options
  )

  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'cache-control': 'public, immutable, no-transform, max-age=31536000',
    },
  })
}
