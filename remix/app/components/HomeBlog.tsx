import React from 'react'
import {Link} from 'remix'

import {ArticleDocument} from '~/lib/sanity/types'
import Published from '~/components/Published'

export default function HomeBlog({article}: {article: ArticleDocument}) {
  return (
    <article className="grid grid-cols-1 gap-y-4">
      <h2 className="md:leading-none font-black tracking-tighter text-3xl md:text-4xl text-blue-500">
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
        <Published updated={article?.updated} published={article.published} />
      ) : null}
      {article?.summary ? (
        <div className="prose prose-lg dark:prose-dark prose-blue">
          <p>{article.summary}</p>
        </div>
      ) : null}
    </article>
  )
}
