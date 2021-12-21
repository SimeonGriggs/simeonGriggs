import { type LoaderFunction } from "remix";
import { getClient } from "~/lib/sanity/getClient";
import { homeQuery, siteMetaQuery } from "~/lib/sanity/queries";
import { ArticleDocument } from "~/lib/sanity/types";
import { removeTrailingSlash } from "~/lib/utils/helpers";

export const loader: LoaderFunction = async () => {
  const articles: ArticleDocument[] = await getClient().fetch(homeQuery)
  const siteMeta = await getClient().fetch(siteMetaQuery)
  
  const articleMarkup = articles
  .map((article) => {
    const {title, published, summary} = article

    const canonical = siteMeta?.siteUrl ? removeTrailingSlash(siteMeta.siteUrl + `/` + article.slug.current) : ``
      return [
        `<item>`,
        `<title>${title}</title>`,
        `<pubDate>${published}</pubDate>`,
        `<description><![CDATA[${summary}]]></description>`,
        // TODO: Add full HTML of article
        // `<content:encoded><![CDATA[${html}]]></content:encoded>`,
        `<link>${canonical}</link>`,
        `</item>`,
      ].join("");
    });

  const rss = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">`,
    `<channel>`,
    `<title>${siteMeta.title}</title>`,
    `<description>${siteMeta.description}</description>`,
    `<link>${siteMeta.siteUrl}</link>`,
    `<atom:link href="${siteMeta.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    `<language>en</language>`,
    `<sy:updatePeriod>daily</sy:updatePeriod>`,
    ...articleMarkup,
    `</channel>`,
    `</rss>`,
  ];

  return new Response(rss.join(""), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
};
