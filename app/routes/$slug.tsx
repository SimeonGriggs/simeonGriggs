import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node'
import {json} from '@remix-run/node'
import type {RouteMatch} from '@remix-run/react'
import {useLoaderData} from '@remix-run/react'
import {GroqStoreProvider} from '@sanity/preview-kit/groq-store'

import Article from '~/components/Article'
import ExitPreview from '~/components/ExitPreview'
import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/constants'
import type {loader as rootLoader} from '~/root'
import {getClient, writeClient} from '~/sanity/client'
import {projectDetails} from '~/sanity/projectDetails'
import {articleQuery} from '~/sanity/queries'
import {getSession} from '~/sessions'
import styles from '~/styles/app.css'
import {articleZ} from '~/types/article'
import {commentZ} from '~/types/comment'

export const handle = {id: `article`}

export const links: LinksFunction = () => {
  return [
    {rel: 'preload', href: styles, as: 'style'},
    {rel: 'stylesheet', href: styles},
  ]
}

export const meta: V2_MetaFunction = (props) => {
  const {data, matches} = props
  const rootData = matches.find((match: RouteMatch) => match?.id === `root`) as
    | {data: SerializeFrom<typeof rootLoader>}
    | undefined
  const siteMeta = rootData ? rootData.data.siteMeta : null
  const {article} = data ?? {}

  if (!article?.title) {
    return [{title: `Article not found`}]
  }

  // Create meta image
  const {_id, title, summary} = article
  const remoteUrl = `https://www.simeongriggs.dev`
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : remoteUrl
  const ogImageUrl = new URL(`${baseUrl}/resource/og`)
  ogImageUrl.searchParams.set(`id`, _id)

  // SEO Meta
  const pageTitle = siteMeta ? `${title} | ${siteMeta.title}` : title

  return [
    {title: pageTitle},
    {name: 'description', content: summary},
    {property: 'twitter:card', content: 'summary_large_image'},
    {
      property: 'twitter:creator',
      content: siteMeta ? String(siteMeta.author) : '',
    },
    {property: 'twitter:title', content: pageTitle},
    {property: 'twitter:description', content: summary},
    {property: 'og:title', content: pageTitle},
    {property: 'og:description', content: summary},
    {property: 'og:type', content: 'website'},
    {property: 'og:image:width', content: String(OG_IMAGE_WIDTH)},
    {property: 'og:image:height', content: String(OG_IMAGE_HEIGHT)},
    {property: 'og:image', content: ogImageUrl.toString()},
  ]
}

export const action: ActionFunction = async ({request}) => {
  const body = await request.formData()

  // Basic honeypot check
  if (body?.get(`validation`)) {
    return null
  }

  const comment = commentZ.parse({
    _type: 'comment',
    content: String(body.get(`content`)),
    name: String(body.get(`name`)),
    commentKey: String(body.get(`_key`)),
    email: String(body.get(`email`)),
    commentOn: {
      _type: `reference`,
      _ref: String(body.get(`_id`)),
    },
  })

  const data = await writeClient.create(comment).then((res) => res)

  return data
}

export const loader = async ({request, params}: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const token: string = session.get('token')
  const preview = Boolean(token)

  const article = await getClient(preview)
    .fetch(articleQuery, params)
    .then((result) => (result ? articleZ.parse(result) : null))

  if (!article) {
    throw new Response(`Article not found`, {status: 404})
  }

  return json({
    article,
    preview,
    query: preview ? articleQuery : null,
    params: preview ? params : null,
    // Note: This makes the token available to the client if they have an active session
    // This is useful to show live preview to unauthenticated users
    // If you would rather not, replace token with `null` and it will rely on your Studio auth
    token: preview ? token : null,
  })
}

const {projectId, dataset} = projectDetails()

export default function Index() {
  const {article, preview, query, params, token} = useLoaderData<typeof loader>()
  const children = <Article article={article} query={query ?? ``} params={params ?? {}} />

  if (preview && token) {
    return (
      <GroqStoreProvider projectId={projectId} dataset={dataset} token={token}>
        <>
          {children}
          <ExitPreview />
        </>
      </GroqStoreProvider>
    )
  }

  return children
}
