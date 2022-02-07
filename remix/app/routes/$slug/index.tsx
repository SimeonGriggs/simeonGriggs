import {useState} from 'react'
import type {MetaFunction, LoaderFunction, ActionFunction} from 'remix'
import {useLoaderData, redirect} from 'remix'

import {filterDataToSingleItem} from '~/lib/sanity/helpers'
import {articleQuery} from '~/lib/sanity/queries'
import {getClient} from '~/lib/sanity/getClient'
import {removeTrailingSlash} from '~/lib/utils/helpers'

import Published from '~/components/Published'
import Label from '~/components/Label'
import Preview from '~/components/Preview'
import ProseableText from '~/components/ProseableText'
import TableOfContents from '~/components/TableOfContents'
import {ArticleDocument, CommentDocument} from '~/lib/sanity/types'
import {createComment} from '~/lib/sanity/createComment'
import Subscribe from '~/components/Subscribe'

export const handle = `article`

export const meta: MetaFunction = ({
  data,
  parentsData,
  location,
}: {
  data: {
    initialData: ArticleDocument[]
    preview: boolean
  }
  parentsData: any
  location: any
}) => {
  const {siteMeta} = parentsData?.root ?? {}

  const {initialData, preview} = data ?? {}
  const article = filterDataToSingleItem(initialData, preview)

  if (!article?.title) {
    return {title: `Article not found`}
  }

  const {title, summary, image} = article

  const canonical = removeTrailingSlash(siteMeta?.siteUrl + location.pathname)
  const canonicalMetaImage = removeTrailingSlash(`${canonical}/meta-image`)

  const imageWidth = `1200`
  const imageHeight = `630`
  const imageUrl = new URL(`https://api.apiflash.com/v1/urltoimage`)
  imageUrl.searchParams.set(`access_key`, `d4345468a9d24be5a2e5d41fea154708`)
  imageUrl.searchParams.set(`url`, canonicalMetaImage)
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

  return {
    title: `${title} | ${siteMeta?.title}`,
    description: summary,
    canonical,
    'twitter:card': 'summary_large_image',
    'twitter:creator': siteMeta?.author,
    'twitter:title': title,
    'twitter:description': summary,
    'og:url': canonical,
    ...imageMeta,
  }
}

// export const links: LinksFunction = () => {
//   return [{rel: 'canonical', href: `hmm`}]
// }

export const action: ActionFunction = async ({request}) => {
  const body = await request.formData()

  // Basic honeypot check
  if (body?.get(`validation`)) {
    return null
  }

  const {pathname} = new URL(request.url)

  const comment: CommentDocument = {
    _type: 'comment',
    content: body?.get(`content`) ? String(body.get(`content`)) : null,
    name: body?.get(`name`) ? String(body.get(`name`)) : null,
    commentKey: body?.get(`_key`) ? String(body.get(`_key`)) : null,
    email: body?.get(`email`) ? String(body.get(`email`)) : null,
    commentOn: {
      _type: `reference`,
      _ref: body?.get(`_id`) ? String(body.get(`_id`)) : null,
    },
  }

  const data = await createComment(comment)
  const {transactionId} = data
  const redirectPath = `${pathname}?transactionId=${transactionId}`

  return redirect(redirectPath)
}

// Runs server side
export const loader: LoaderFunction = async (props) => {
  const {request, params} = props

  // Put site in preview mode if the right query param is used
  const requestUrl = new URL(request.url)
  const preview = requestUrl.searchParams.get(`preview`) === process.env.SANITY_PREVIEW_SECRET

  // Or if a new comment has been posted, query the API for fresh data
  const newComment = Boolean(requestUrl.searchParams.get(`transactionId`))

  const initialData = await getClient(preview || newComment).fetch(articleQuery, params)

  if (!initialData || !initialData.length) {
    throw new Response(`Not Found`, {
      status: 404,
    })
  }

  return {
    initialData,
    preview,
    query: preview ? articleQuery : ``,
    params: preview ? params : {},
  }
}

// Runs client side
export default function Article() {
  const {initialData, preview} = useLoaderData()
  const [data, setData] = useState(initialData)

  // The query may return more than one document, eg, a draft and published version
  // If preview is enabled, get the draft, otherwise, get the published
  const article = filterDataToSingleItem(data, preview)

  const {title, summary, content, published, updated, comments} = article ?? {}

  return (
    <>
      {preview && <Preview data={data} setData={setData} />}
      <header className="mt-32 md:mt-0 row-start-1 col-span-6 md:col-start-3 md:col-span-10 lg:col-start-5 lg:col-span-11">
        <div className="py-12 md:py-24 max-w-xl">
          {title ? (
            <h1 className="leading-none font-black mb-8 tracking-tighter text-4xl md:text-6xl text-blue-500">
              {title}
            </h1>
          ) : null}
          {summary ? (
            <p className="text-lg dark:text-blue-100 md:leading-8 font-mono">{summary}</p>
          ) : null}
        </div>
      </header>
      <aside className="mb-4 md:mb-0 row-start-2 md:row-start-2 col-span-6 md:col-start-3 md:col-span-3 lg:col-start-5 lg:col-span-3 relative">
        {content?.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-4 md:pr-12 sticky top-6">
            <Label>Table of Contents</Label>
            <TableOfContents blocks={content} />
          </div>
        ) : null}
      </aside>
      <section className="row-start-3 md:row-start-2 col-span-6 lg:col-start-8 lg:col-span-8 mt-6 md:mt-0 pb-24">
        {published ? <Published updated={updated} published={published} /> : null}
        {content?.length > 0 ? <ProseableText blocks={content} comments={comments} /> : null}
        <aside className="mt-12 p-6 bg-blue-500 text-white">
          <h3 className="border-b border-white text-2xl font-black mb-3 pb-3 leading-none">
            There's more where this came from
          </h3>
          <p className="text-lg mb-6">Subscribe for updates. Not spam.</p>
          <Subscribe />
        </aside>
      </section>
    </>
  )
}
