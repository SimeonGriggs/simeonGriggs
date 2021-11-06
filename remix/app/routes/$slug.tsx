import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

import sanityImageUrl from "~/lib/sanityImageUrl";
import { articleQuery } from "~/lib/queries";
import { getClient } from "~/lib/sanityServer";

import ProseableText from "~/components/ProseableText";
import Label from "~/components/Label";
import Date from "~/components/Date";
import TableOfContents from "~/components/TableOfContents";
import { usePreviewSubscription } from "~/hooks/usePreviewSubscription";

export let meta: MetaFunction = ({ data, parentsData, location }) => {
  const { title, summary, image } = data?.initialData ?? {};
  const { siteMeta } = parentsData?.root ?? {};
  const canonical = siteMeta?.siteUrl + location.pathname;
  const imageWidth = 1200;
  const imageHeight = 630;

  const imageMeta = image
    ? {
        "og:image:width": image ? String(imageWidth) : null,
        "og:image:height": image ? String(imageHeight) : null,
        "og:image": image
          ? sanityImageUrl(image)
              .height(imageHeight)
              .width(imageWidth)
              .toString()
          : null,
      }
    : {};

  return {
    "theme-color": "#2522fc",
    title: `${title} | ${siteMeta?.title}`,
    description: summary,
    canonical,
    "twitter:card": "summary_large_image",
    "twitter:creator": siteMeta?.author,
    "twitter:title": title,
    "twitter:description": siteMeta?.description,
    type: "website",
    "og:url": canonical,
    ...imageMeta,
  };
};

// export let links: LinksFunction = () => {
//   return [{ rel: "canonical", href: stylesUrl }];
// };

// Runs server side
export let loader: LoaderFunction = async ({ params }) => {
  const preview = false;
  const article = await getClient(preview).fetch(articleQuery, params);

  return { initialData: article, query: articleQuery, params, preview };
};

// Runs client side
export default function Article() {
  let { initialData, query, params, preview } = useLoaderData();

  const { data: article } = usePreviewSubscription(query, {
    params,
    initialData,
    enabled: preview,
  });

  return (
    <>
      <header className="mt-48 md:mt-0 row-start-1 col-span-6 md:col-start-3 md:col-span-10 lg:col-start-5 lg:col-span-11">
        <div className="py-12 md:py-24 max-w-xl">
          <h1 className="leading-none font-black mb-8 tracking-tighter text-4xl md:text-6xl text-blue-500">
            {article.title}
          </h1>
          <p className="text-lg dark:text-blue-100 md:leading-8 font-mono">
            {article.summary}
          </p>
        </div>
      </header>
      <aside className="mb-4 md:mb-0 row-start-2 md:row-start-2 col-span-6 md:col-start-3 md:col-span-3 lg:col-start-5 lg:col-span-3 relative">
        {article?.content?.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-4 md:pr-12 sticky top-6">
            <Label>Table of Contents</Label>
            <TableOfContents blocks={article.content} />
          </div>
        ) : null}
      </aside>
      <section className="row-start-3 md:row-start-2 col-span-6 lg:col-start-8 lg:col-span-8 pb-24">
        <Date updated={article?.updated} published={article?.published} />
        {article?.content?.length > 0 ? (
          <ProseableText blocks={article.content} />
        ) : null}
      </section>
    </>
  );
}
