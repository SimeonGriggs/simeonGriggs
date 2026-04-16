import {useQuery} from '~/sanity/loader'
import type {
  LinksFunction,
  MetaFunction,
} from 'react-router'
import {useLoaderData} from 'react-router'
import {
  LOCAL_OG_URL,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  PROD_OG_URL,
} from '../../../../packages/constants/src'

import Article from '~/components/Article'
import {getEnv} from '~/env.server'
import type {loader as layoutLoader} from '~/routes/_website'
import {getWriteClient} from '~/sanity/client.server'
import {fixInitialType} from '~/sanity/fixInitialType'
import {loadServerQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions'
import {ARTICLE_QUERY} from '~/sanity/queries'
import styles from '@repo/tailwind/app.css?url'
import type {Article as ArticleType} from '~/types/article'
import {articleZ} from '~/types/article'
import {commentZ} from '~/types/comment'
import type {Route} from './+types/_website.$slug'

export const handle = {id: `article`}

export const links: LinksFunction = () => {
  return [
    {rel: 'preload', href: styles, as: 'style'},
    {rel: 'stylesheet', href: styles},
  ]
}

export const meta: MetaFunction<
  typeof loader,
  {
    'routes/_website': typeof layoutLoader
  }
> = (props) => {
  const {data, matches} = props
  const routeData = data as Awaited<ReturnType<typeof loader>> | undefined
  const layoutData = matches.find(
    (match) => match.id === `routes/_website`,
  )?.data

  const {_id, _updatedAt, title, summary} = routeData?.initial.data ?? {}
  const baseUrl =
    import.meta.env.DEV ? LOCAL_OG_URL : PROD_OG_URL
  const ogImageUrl = new URL(`/image`, baseUrl)

  if (_id) {
    ogImageUrl.searchParams.set(`id`, _id)
  }
  if (_updatedAt) {
    ogImageUrl.searchParams.set(`updatedAt`, _updatedAt)
  }

  // SEO Meta
  const pageTitle = layoutData
    ? [title, layoutData.initial.data.title].filter(Boolean).join(` | `)
    : title

  return [
    {title: pageTitle},
    {name: 'description', content: summary},
    {property: 'twitter:card', content: 'summary_large_image'},
    {
      property: 'twitter:creator',
      content: layoutData ? String(layoutData.initial.data.author) : '',
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

export const action = async ({request, context}: Route.ActionArgs) => {
  const env = getEnv(context)
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

  const data = await getWriteClient(env).create(comment).then((res) => res)

  return data
}

export const loader = async ({request, params, context}: Route.LoaderArgs) => {
  const env = getEnv(context)
  const {options, preview} = await loadQueryOptions(request.headers, env)

  const query = ARTICLE_QUERY

  const initial = await loadServerQuery(query, params, options, env).then((result) => ({
    ...result,
    data: articleZ.parse(result.data),
  }))

  if (!initial.data && !preview) {
    throw new Response(`Article not found`, {status: 404})
  }

  return {
    initial,
    query,
    params,
  }
}

export default function Index() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data} = useQuery<ArticleType>(query, params, fixInitialType(initial))

  return data ? <Article article={data} /> : <div>Loading...</div>
}
