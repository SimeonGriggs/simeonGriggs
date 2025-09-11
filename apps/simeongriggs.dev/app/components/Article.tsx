import {PencilSquareIcon} from '@heroicons/react/24/outline'
import {PortableText} from '@portabletext/react'
import {components} from '@repo/frontend'

import Published from '~/components/Published'
import Subscribe from '~/components/Subscribe'
import TableOfContents from '~/components/TableOfContents'
import type {Article as ArticleType} from '~/types/article'

type ArticleProps = {
  article: ArticleType
}

export default function Article(props: ArticleProps) {
  const {_id, title, summary, tableOfContents, content, updated, published} =
    props.article

  return (
    <div className="grid grid-cols-1 gap-12 px-4 pb-32 md:mt-0 md:grid-cols-12 md:gap-0 md:px-0 lg:grid-cols-16">
      <div className="grid-col-1 grid gap-6 pt-48 md:col-span-8 md:col-start-3 md:py-24 lg:col-span-8 lg:col-start-5">
        {title ? (
          <h1 className="text-4xl font-black leading-none tracking-tighter text-blue-500 md:text-6xl lg:text-7xl text-balance">
            {title}
          </h1>
        ) : null}

        {summary ? (
          <p className="max-w-xl font-mono leading-relaxed md:text-lg md:leading-loose text-pretty">
            {summary}
          </p>
        ) : null}

        <a
          className="flex items-center gap-2 font-mono text-xs text-blue-500 hover:bg-blue-500 hover:text-white dark:text-blue-200 dark:hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
          href={`/studio/structure/article;${_id}`}
        >
          <PencilSquareIcon className="w-5" />
          View in Sanity Studio
        </a>
      </div>

      <div className="md:col-span-2 md:col-start-3 md:row-start-2 lg:col-span-3 lg:col-start-5">
        {tableOfContents && tableOfContents?.length > 0 ? (
          <TableOfContents value={tableOfContents} />
        ) : null}
      </div>

      <div className="md:col-span-6 md:col-start-6 md:row-start-2 lg:col-span-7 lg:col-start-9">
        {published ? (
          <div className="mb-2">
            <Published updated={updated ?? undefined} published={published} />
          </div>
        ) : null}

        {content && content?.length > 0 ? (
          <PortableText value={content} components={components} />
        ) : null}

        <Subscribe />
      </div>
    </div>
  )
}
