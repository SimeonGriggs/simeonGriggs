import {useState} from 'react'
import type {MetaFunction, LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {filterDataToSingleItem} from '~/lib/sanity/helpers'
import {talkQuery} from '~/lib/sanity/queries'
import {getClient} from '~/lib/sanity/getClient'
import {removeTrailingSlash} from '~/lib/utils/helpers'

import Published from '~/components/Published'
import Preview from '~/components/Preview'
import ProseableText from '~/components/ProseableText'
import TableOfContents from '~/components/TableOfContents'
import {TalkDocument} from '~/lib/sanity/types'
import Subscribe from '~/components/Subscribe'
import TypeVideo from '~/components/PortableText/TypeVideo'

export const handle = `article`

export const meta: MetaFunction = ({
  data,
  parentsData,
  location,
}: {
  data: {
    initialData: TalkDocument[]
    preview: boolean
  }
  parentsData: any
  location: any
}) => {
  const {siteMeta} = parentsData?.root ?? {}

  const {initialData, preview} = data ?? {}
  const talk = filterDataToSingleItem(initialData, preview)

  if (!talk?.title) {
    return {title: `Talk not found`}
  }

  const {title, image, summary, _updatedAt} = talk

  const canonical = removeTrailingSlash(siteMeta?.siteUrl + location.pathname)
  const canonicalMetaImage = new URL(removeTrailingSlash(`${canonical}/meta-image`))
  canonicalMetaImage.searchParams.set(`version`, `1`)

  // Refresh meta image when article is updated
  if (_updatedAt) {
    canonicalMetaImage.searchParams.set(`updatedAt`, _updatedAt)
  }

  const imageWidth = `1200`
  const imageHeight = `630`
  const imageUrl = new URL(`https://api.apiflash.com/v1/urltoimage`)
  imageUrl.searchParams.set(`access_key`, `d4345468a9d24be5a2e5d41fea154708`)
  imageUrl.searchParams.set(`url`, canonicalMetaImage.toString())
  imageUrl.searchParams.set(`height`, imageHeight)
  imageUrl.searchParams.set(`width`, imageWidth)
  imageUrl.searchParams.set(`format`, `png`)
  imageUrl.searchParams.set(`response_type`, `image`)
  imageUrl.searchParams.set(`scale_factor`, `2`)
  imageUrl.searchParams.set(`fail_on_status`, `300-399,400-499,500-599`)

  const imageMeta = image
    ? {
        'og:image:width': imageWidth,
        'og:image:height': imageHeight,
        'og:image': imageUrl.toString(),
      }
    : {}

  const pageTitle = `${title} | ${siteMeta?.title}`

  return {
    title: pageTitle,
    description: summary,
    canonical,
    'twitter:card': 'summary_large_image',
    'twitter:creator': siteMeta?.author,
    'twitter:title': pageTitle,
    'twitter:description': summary,
    'og:url': canonical,
    'og:title': pageTitle,
    'og:description': summary,
    'og:type': 'website',
    ...imageMeta,
  }
}

// Runs server side
export const loader: LoaderFunction = async (props) => {
  const {request, params} = props

  // Put site in preview mode if the right query param is used
  const requestUrl = new URL(request.url)
  const preview = requestUrl.searchParams.get(`preview`) === process.env.SANITY_PREVIEW_SECRET
  const initialData = await getClient(preview).fetch(talkQuery, params)

  if (!initialData || !initialData.length) {
    throw new Response(`Not Found`, {
      status: 404,
    })
  }

  return {
    initialData,
    preview,
    query: preview ? talkQuery : ``,
    params: preview ? params : {},
  }
}

// Runs client side
export default function Talk() {
  const {initialData, preview} = useLoaderData()
  const [data, setData] = useState(initialData)

  // The query may return more than one document, eg, a draft and published version
  // If preview is enabled, get the draft, otherwise, get the published
  const talk = filterDataToSingleItem(data, preview)

  const {title, content, video, eventDate} = talk ?? {}

  return (
    <>
      {preview && <Preview data={data} setData={setData} />}
      <header className="col-span-6 row-start-1 mt-32 md:col-span-10 md:col-start-3 md:mt-0 lg:col-span-11 lg:col-start-5">
        <div className="max-w-xl py-12 md:py-24">
          {title ? (
            <h1 className="mb-8 text-4xl font-black leading-none tracking-tighter text-blue-500 md:text-6xl">
              {title}
            </h1>
          ) : null}
        </div>
      </header>
      <aside className="relative col-span-6 row-start-2 mb-4 md:col-span-3 md:col-start-3 md:row-start-2 md:mb-0 lg:col-span-3 lg:col-start-5">
        {content?.length > 0 ? (
          <div className="sticky top-6 grid grid-cols-1 gap-y-4 md:pr-12">
            <TableOfContents blocks={content} />
          </div>
        ) : null}
      </aside>
      <section className="col-span-6 row-start-3 mt-6 flex flex-col gap-y-4 pb-24 md:row-start-2 md:mt-0 md:gap-y-8 lg:col-span-8 lg:col-start-8">
        {eventDate ? <Published published={eventDate} /> : null}
        {video?.url ? <TypeVideo value={video} /> : null}
        {content?.length > 0 ? <ProseableText blocks={content} /> : null}
        <Subscribe />
      </section>
    </>
  )
}
