import {Link} from 'react-router'

import Published from '~/components/Published'
import {PROSE_CLASSES} from '~/lib/prose-classes'
import type {ArticleStub} from '~/types/stubs'

export default function HomeBlog(props: ArticleStub) {
  const {slug, title, published, updated, summary} = props

  return (
    <article className="grid grid-cols-1 gap-y-4">
      <h2 className="text-3xl font-black tracking-tighter text-blue-500 md:text-4xl md:leading-none">
        {slug?.current ? (
          <Link
            to={`/${slug.current}`}
            prefetch="intent"
            className="block hover:bg-blue-500 hover:text-white"
          >
            {title}
          </Link>
        ) : (
          <>{title}</>
        )}
      </h2>
      {published ? (
        <Published updated={updated ?? undefined} published={published} />
      ) : null}
      {summary ? (
        <div
          className={PROSE_CLASSES}
          // className="prose prose-lg prose-blue dark:prose-dark"
        >
          <p>{summary}</p>
        </div>
      ) : null}
    </article>
  )
}
