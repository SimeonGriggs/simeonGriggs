import type {LoaderFunction} from 'react-router'

import {removeTrailingSlash} from '~/lib/helpers'
import {client} from '~/sanity/client'
import {HOME_QUERY, SITE_META_QUERY} from '~/sanity/queries'
import {siteMetaZ} from '~/types/siteMeta'
import {articleStubsZ, combinedStubsZ} from '~/types/stubs'

export const loader: LoaderFunction = async () => {
  const articles = await client
    .fetch(HOME_QUERY)
    .then((result) => combinedStubsZ.parse(result))
  const siteMeta = await client
    .fetch(SITE_META_QUERY)
    .then((res) => siteMetaZ.parse(res))

  const articleMarkup = articles
    .filter((a) => a._type === 'article')
    .map((article) => {
      const {title, published, summary} = article

      const canonical = removeTrailingSlash(
        `${siteMeta.siteUrl}/${article.slug.current}`,
      )

      return [
        `<item>`,
        `<title>${title}</title>`,
        `<pubDate>${published}</pubDate>`,
        `<description><![CDATA[${summary}]]></description>`,
        // TODO: Add full HTML of article
        // `<content:encoded><![CDATA[${html}]]></content:encoded>`,
        `<link>${canonical}</link>`,
        `</item>`,
      ].join('')
    })

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
  ]

  return new Response(rss.join(''), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'x-content-type-options': 'nosniff',
    },
  })
}
