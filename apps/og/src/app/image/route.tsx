import type {SanityImageSource} from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'
import {ImageResponse} from 'next/og'
import {defineQuery} from 'groq'
import type {SanityDocument, SanityDocumentLike} from 'sanity'
import {createClient} from '@sanity/client'
import {z} from 'zod'
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SITE_NAME,
} from '@repo/constants'
import {sanityImageObjectExtendedZ} from '../../../../simeongriggs.dev/app/types/image'

const clientWithToken = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN!,
  useCdn: true,
  apiVersion: SANITY_API_VERSION,
})
const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  }).image(source)

const fontMono = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/JetBrainsMono-Regular.ttf`)).then((res) =>
    res.arrayBuffer(),
  )
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

const BLUE_500 = `#2522fc`
const BLUE_600 = `#0035aa`

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

export async function GET(request: Request) {
  const {origin, searchParams} = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Bad request', {status: 400})
  }

  const query = defineQuery(`*[_id == $id][0]{ 
    ..., 
    image { 
      ..., 
      asset->{ 
        _id,
        _type,
        altText,
        description,
        metadata {
          blurHash
        },
      } 
    } 
  }`)
  const doc: SanityDocument | null = await clientWithToken.fetch(query, {id})

  if (!doc) {
    return new Response('Bad request', {status: 400})
  }

  const document = z.object({
    _id: z.string(),
    _type: z.string(),
    title: z.string(),
    published: z.string(),
    updated: z.string(),
    image: sanityImageObjectExtendedZ,
  })
  const {title, published, updated, image} = document.parse({
    ...DEFAULT_CONTENT,
    ...doc,
  })

  let imageUrl

  if ('asset' in image && image.asset) {
    imageUrl = urlFor({
      asset: image.asset,
      crop: image.crop,
      hotspot: image.hotspot,
    })
      .width(400)
      .height(OG_IMAGE_HEIGHT)
      .auto('format')
      .url()
  }

  const allText = [title, published, updated, SITE_NAME]
    .filter(Boolean)
    .join(' ')

  return new ImageResponse(
    (
      <div
        style={{
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
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
                  backgroundColor: BLUE_500,
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
              background: BLUE_500,
              height: `100%`,
            }}
          >
            <div
              style={{
                letterSpacing: '-0.04em',
                flex: 1,
                color: 'white',
                fontFamily: 'Archivo',
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
                {published && !updated
                  ? published
                  : updated
                    ? `Updated ${updated}`
                    : ``}
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 30,
                }}
              >
                {SITE_NAME}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: await fontMono(origin),
          style: 'normal',
        },
        {
          name: 'Archivo',
          data: await loadGoogleFont('Archivo', allText),
          style: 'normal',
        },
      ],
    },
  )
}
