import {MetaFunction, LoaderFunction, useMatches, useLoaderData} from 'remix'

// import stylesUrl from "../styles/index.css";
import {communityClient, getClient} from '~/lib/sanity/getClient'
import {communityParams, communityQuery, homeQuery} from '~/lib/sanity/queries'
import {ArticleDocument} from '~/lib/sanity/types'
import Intro from '~/components/Intro'
import HomeBlog from '~/components/HomeBlog'
import HomeCommunity from '~/components/HomeCommunity'

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

export const loader: LoaderFunction = async () => {
  const blogArticles: ArticleDocument[] = await getClient(false).fetch(homeQuery)
  // const articles = [{_id: 'yeah'}]

  const sanityArticles: ArticleDocument[] = await communityClient.fetch(
    communityQuery,
    communityParams
  )

  const articles = [...blogArticles, ...sanityArticles]
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.published) - new Date(a.published))

  return {articles}
}

export default function Index() {
  const {articles}: {articles: ArticleDocument[]} = useLoaderData()
  const matches = useMatches()
  const {bio} = matches?.find((match) => match.handle === 'root')?.data?.siteMeta ?? {}

  return (
    <section className="mt-48 md:mt-0 col-span-6 md:col-start-6 lg:col-start-8 md:col-span-6 lg:col-span-8">
      <div className="grid grid-cols-1 gap-y-12 md:gap-y-24 md:py-48">
        <article className="prose prose-lg prose-blue">
          <h1>
            <span className="wave">👋</span> Hey!
          </h1>
        </article>

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
