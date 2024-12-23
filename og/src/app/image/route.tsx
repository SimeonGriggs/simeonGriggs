import type {SanityImageSource} from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'
import {ImageResponse} from 'next/og'
import {defineQuery} from 'groq'
import type {SanityDocument, SanityDocumentLike} from 'sanity'
import {createClient} from '@sanity/client'
import type {SatoriOptions} from 'satori'
import {z} from 'zod'
import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL} from '@repo/constants'
import {sanityImageObjectExtendedZ} from '../../../../blog/app/types/image'

const clientWithToken = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN!,
  useCdn: true,
})
const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  }).image(source)

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

  return new ImageResponse(
    (
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
      </div>
    ),
    options,
  )
}
