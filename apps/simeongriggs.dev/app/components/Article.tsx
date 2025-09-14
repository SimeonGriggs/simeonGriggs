import {PencilSquareIcon} from '@heroicons/react/24/outline'
import {PortableText} from '@portabletext/react'
import {components, Heading, Lead, Subheading} from '@repo/frontend'

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
    <div className="lg:grid-cols-16 grid grid-cols-1 gap-12 px-4 pb-32 md:mt-0 md:grid-cols-12 md:gap-0 md:px-0">
      <div className="grid-col-1 grid pt-48 md:col-span-8 md:col-start-3 md:py-24 lg:col-span-8 lg:col-start-5">
        {title ? (
          <Heading as="h1" className="mt-2">
            {title}
          </Heading>
        ) : null}

        {summary ? <Lead className="mt-6 max-w-3xl">{summary}</Lead> : null}

        <Subheading className="mt-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/studio/structure/article;${_id}`}
            className="inline-flex items-center gap-2"
            items-center
          >
            <PencilSquareIcon className="size-4" />
            View in Sanity Studio
          </a>
        </Subheading>
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
