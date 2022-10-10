import React from 'react'
import {LinkIcon} from '@heroicons/react/24/solid'

import type {ArticleDocument} from '~/lib/sanity/types'
import Published from '~/components/Published'
import Label from '~/components/Label'

export default function HomeCommunity({article}: {article: ArticleDocument}) {
  return (
    <article className="-mx-4 grid grid-cols-1 gap-y-4 border-gray-100 px-4 dark:border-blue-800 md:mx-0 md:border-l-4">
      {article?.slug?.current ? (
        <h3 className="text-2xl font-black tracking-tighter text-blue-500 hover:text-white md:text-2xl md:leading-none">
          <LinkIcon className="float-right h-auto w-5" />
          <a
            href={`https://www.sanity.io/guides/${article.slug.current}`}
            className="block hover:bg-[#f03e2f] hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title}
          </a>
        </h3>
      ) : (
        <h3>{article?.title}</h3>
      )}

      {article?.published ? (
        <div className="flex justify-between">
          <Published updated={article?.updated} published={article.published} />
          <Label>Posted on Sanity.io Exchange</Label>
        </div>
      ) : null}

      {article?.summary ? (
        <div className="prose prose-blue dark:prose-dark md:prose-lg">
          <p>{article.summary}</p>
        </div>
      ) : null}
    </article>
  )
}
