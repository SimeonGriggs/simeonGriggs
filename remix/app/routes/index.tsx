import {MetaFunction, LoaderFunction} from '@remix-run/node'
import {useMatches, useLoaderData} from '@remix-run/react'

// import stylesUrl from "../styles/index.css";
import {communityClient, getClient} from '~/lib/sanity/getClient'
import {communityParams, communityQuery, homeQuery} from '~/lib/sanity/queries'
import {ArticleDocument} from '~/lib/sanity/types'
import Intro from '~/components/Intro'
import HomeBlog from '~/components/HomeBlog'
import HomeCommunity from '~/components/HomeCommunity'
import HomeTitle from '~/components/HomeTitle'

export const handle = `home`

export const meta: MetaFunction = ({parentsData}) => {
  const {siteMeta} = parentsData?.root ?? {}

  return {
    title: `${siteMeta?.title} - ${siteMeta?.description}`,
    description: siteMeta?.description,
  }
}

// export let links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: stylesUrl }];
// };

export const loader: LoaderFunction = async ({request}) => {
  // Put site in preview mode if the right query param is used
  const requestUrl = new URL(request.url)
  const preview = requestUrl.searchParams.get(`preview`) === process.env.SANITY_PREVIEW_SECRET

  const articlesUnsorted = await Promise.all<ArticleDocument[][]>([
    await getClient(preview).fetch(homeQuery),
    await communityClient.fetch(communityQuery, communityParams),
  ])

  const articles = articlesUnsorted
    .flat()
    .filter((article) => article?.published)
    .sort((a, b) => new Date(b.published) - new Date(a.published))

  return {articles}
}

export default function Index() {
  const {articles}: {articles: ArticleDocument[]} = useLoaderData()
  const matches = useMatches()
  const {bio} = matches?.find((match) => match.handle === 'root')?.data?.siteMeta ?? {}

  return (
    <section className="col-span-6 mt-48 md:col-span-6 md:col-start-6 md:mt-0 lg:col-span-8 lg:col-start-8">
      <div className="grid grid-cols-1 gap-y-12 md:gap-y-24 md:py-48">
        <HomeTitle title="Hello, internet!" wave />

        {bio?.length > 0 ? <Intro blocks={bio} /> : null}

        {articles.map((article) =>
          article.source === 'blog' ? (
            <HomeBlog key={article._id} article={article} />
          ) : (
            <HomeCommunity key={article._id} article={article} />
          )
        )}
      </div>
    </section>
  )
}
