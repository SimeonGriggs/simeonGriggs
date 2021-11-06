import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { Link } from "react-router-dom";

// import stylesUrl from "../styles/index.css";
import { getClient } from "~/lib/sanityServer";
import sanityImageUrl from "~/lib/sanityImageUrl";
import { homeQuery } from "~/lib/queries";
import Intro from "~/components/Intro";
import Date from "~/components/Date";

export let meta: MetaFunction = ({ parentsData }) => {
  const { siteMeta } = parentsData?.root ?? {};

  return {
    title: `${siteMeta?.title} - ${siteMeta?.description}`,
    description: siteMeta?.description,
  };
};

// export let links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: stylesUrl }];
// };

export let loader: LoaderFunction = async () => {
  const articles = await getClient().fetch(homeQuery);

  return { articles };
};

export default function Index() {
  let { articles } = useLoaderData();

  return (
    <section className="mt-48 md:mt-0 col-span-6 md:col-start-6 lg:col-start-8 md:col-span-6 lg:col-span-8">
      <div className="grid grid-cols-1 gap-y-12 md:gap-y-24 pt-12 md:py-48">
        <article className="prose prose-lg prose-blue">
          <h1>
            <span className="wave">👋</span> Hey!
          </h1>
        </article>

        <Intro />

        {articles.map((article) => (
          <article key={article._id} className="grid grid-cols-1 gap-y-4">
            <h2 className="leading-none font-black tracking-tighter text-2xl md:text-4xl text-blue-500">
              <Link
                to={`/${article.slug}`}
                className="block hover:bg-blue-500 hover:text-white"
              >
                {article.title}
              </Link>
            </h2>
            <Date updated={article?.updated} published={article?.published} />
            <div className="prose prose-lg dark:prose-dark prose-blue">
              <p>{article.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
