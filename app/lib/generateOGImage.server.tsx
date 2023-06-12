import {Resvg} from '@resvg/resvg-js'
import type {SanityDocument, SanityDocumentLike} from 'sanity'
import type {SatoriOptions} from 'satori'
import satori from 'satori'
import {z} from 'zod'

import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL} from '~/constants'
import {urlFor} from '~/sanity/helpers'
import {sanityImageZ} from '~/types/image'

const fontMono = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/JetBrainsMono-Regular.ttf`)).then((res) => res.arrayBuffer())
const fontSans = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/Inter-ExtraBold.otf`)).then((res) => res.arrayBuffer())

const BLUE = `#2522fc`
const BLUE_600 = `#0703d8`

const DEFAULT_CONTENT: SanityDocumentLike = {
  _id: 'default',
  _type: 'default',
  title: `Hello, internet!`,
  published: ``,
  updated: ``,
  image: {
    asset: {},
  },
}

export async function generateOGImage(doc: SanityDocumentLike, origin: string) {
  const fontMonoData = await fontMono(origin)
  const fontSansData = await fontSans(origin)
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

  const document = z.object({
    _id: z.string(),
    _type: z.string(),
    title: z.string(),
    published: z.string(),
    updated: z.string(),
    image: z.object({
      asset: sanityImageZ,
    }),
  })
  const {title, published, updated, image} = document.parse({
    ...DEFAULT_CONTENT,
    ...doc,
  })

  let imageUrl
  if ('asset' in image && image.asset) {
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
              {SITE_URL.hostname.replace(`www.`, ``)}
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

  return pngBuffer
}
