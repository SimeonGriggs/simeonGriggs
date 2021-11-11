import {MetaFunction, LoaderFunction, useMatches, useLoaderData, Link} from 'remix'

// import stylesUrl from "../styles/index.css";
import {getClient} from '~/lib/sanity/getClient'
import {homeQuery} from '~/lib/sanity/queries'
import Intro from '~/components/Intro'
import Date from '~/components/Date'
import {ArticleDocument} from '~/lib/sanity/types'

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
  const articles: ArticleDocument[] = await getClient(false).fetch(homeQuery)
  // const articles = [{_id: 'yeah'}]

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

        {articles.map((article) => (
          <article key={article._id} className="grid grid-cols-1 gap-y-4">
            <h2 className="leading-none font-black tracking-tighter text-2xl md:text-4xl text-blue-500">
              {article?.slug?.current ? (
                <Link
                  to={`/${article.slug.current}`}
                  prefetch="intent"
                  className="block hover:bg-blue-500 hover:text-white"
                >
                  {article.title}
                </Link>
              ) : (
                <>{article?.title}</>
              )}
            </h2>
            {article?.published ? (
              <Date updated={article?.updated} published={article.published} />
            ) : null}
            <div className="prose prose-lg dark:prose-dark prose-blue">
              <p>{article.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
