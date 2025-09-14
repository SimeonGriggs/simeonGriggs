import type {
  ArticleStub,
  CombinedStubs,
  ExchangeStub,
  LearnStub,
  TalkStub,
  YouTubeVideoStub,
} from '~/types/stubs'
import {urlFor} from '~/sanity/helpers'
import {ChevronDownIcon} from '@heroicons/react/24/outline'
import Published from './Published'
import {Link, useSearchParams} from 'react-router'
import type {Talk} from '~/types/talk'
import {BlockH2, Subheading} from '@repo/frontend'
import clsx from 'clsx'

type TimelineProps = {
  articles: CombinedStubs
}

const DEFAULT_TAB = 'all'

export function Timeline({articles}: TimelineProps) {
  const uniqueTypes = [
    DEFAULT_TAB,
    ...new Set(articles.map((article) => article._type)),
  ]
  const [searchParams, setSearchParams] = useSearchParams()
  const current = searchParams.get('filter') || DEFAULT_TAB
  const handleTabChange = (value: string) => {
    setSearchParams({filter: value}, {preventScrollReset: true})
  }

  return (
    <>
      <Tabs tabs={uniqueTypes} current={current} onChange={handleTabChange} />
      <ul role="list" className="space-y-24">
        {articles
          .filter(
            (article) => current === DEFAULT_TAB || article._type === current,
          )
          .map((article) => (
            <li key={article._id} className="relative flex gap-x-4">
              {(() => {
                switch (article._type) {
                  case 'article':
                    return <BlogPost article={article} />
                  case 'contribution.guide':
                    return <Sanity article={article} />
                  case 'talk':
                    return <Talk article={article} />
                  case 'youTubeVideo':
                    return <Video article={article} />
                  case 'course':
                    return <Sanity article={article} />
                  default:
                    return null
                }
              })()}
            </li>
          ))}
      </ul>
    </>
  )
}

function BlogPost({article}: {article: ArticleStub}) {
  return (
    <article className="relative flex justify-end">
      <div className="flex flex-col gap-6">
        <BlockH2 className="!my-0">
          <Link
            className="text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-100"
            to={`/${article.slug.current}`}
          >
            {article.title}
            <span aria-hidden="true">{` `}&rarr;</span>
            <span className="absolute inset-0"></span>
          </Link>
        </BlockH2>
        <Summary>{article.summary}</Summary>
        <div className="flex items-center justify-between gap-3">
          {article.published ? (
            <Published
              updated={article.updated ?? undefined}
              published={article.published}
            />
          ) : null}
          <Pill>Blog</Pill>
        </div>
      </div>
    </article>
  )
}

function Summary({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={clsx(`text-lg/8 text-gray-600 dark:text-white`, className)}>
      {children}
    </p>
  )
}

function Video({
  article,
  pillText,
}: {
  article: YouTubeVideoStub
  pillText?: string
}) {
  return (
    <article className="rounded-tr-4xl relative min-w-0 overflow-hidden rounded-b-lg rounded-tl-lg bg-white shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-blue-900">
      <div className="relative isolate flex aspect-[16/9] w-full flex-col justify-end overflow-hidden">
        <img
          alt=""
          src={article.thumbnailUrl}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-600 via-blue-600/40" />
        <div className="absolute inset-0 -z-10 rounded-r-2xl ring-1 ring-inset ring-blue-700/10" />

        <div className="flex flex-col gap-3 overflow-hidden p-8 text-gray-300">
          {article.link ? (
            <a
              className="absolute inset-0 z-10"
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Watch {article.title}</span>
            </a>
          ) : null}
          <BlockH2 dark className="text-balance">
            <span className="absolute inset-0" />
            {article.title}
          </BlockH2>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-8">
        <Summary className="line-clamp-3">{article.summary}</Summary>

        {article.link ? (
          <p className="text-base/8 font-semibold text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-100">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Watch on YouTube <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          {article.published ? (
            <Published published={article.published} />
          ) : null}
          <Pill>{pillText || 'YouTube'}</Pill>
        </div>
      </div>
    </article>
  )
}

function Talk({article}: {article: TalkStub}) {
  // Transform TalkStub to YouTubeVideoStub format for Video component
  const videoProps: YouTubeVideoStub = {
    _id: article._id,
    _type: 'youTubeVideo' as const,
    title: [article.title, article.event].filter(Boolean).join(' @ ') || '',
    summary: article.summary || '',
    published: article.published || '',
    link: article.link || '',
    duration: '', // Talk doesn't have duration, so we'll use empty string
    thumbnailUrl: article.image
      ? urlFor(article.image).width(1920).height(1080).auto('format').url() ||
        ''
      : '',
  }

  return <Video article={videoProps} pillText="Talk" />
}

function Sanity({article}: {article: ExchangeStub | LearnStub}) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex w-full flex-col gap-4 py-0.5 text-lg/8 text-gray-500">
        <h2>
          <a
            className="font-medium text-[#f03e2f] hover:text-red-700"
            href={
              article._type === 'contribution.guide'
                ? `https://www.sanity.io/guides/${article.slug.current}`
                : `https://www.sanity.io/learn/course/${article.slug.current}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title} &rarr;
            <span className="absolute inset-0"></span>
          </a>
        </h2>
        <Summary>{article.summary}</Summary>

        <div className="flex items-center justify-between gap-3">
          {article.published ? (
            <Published
              updated={
                article._type === 'contribution.guide' && article.updated
                  ? article.updated
                  : undefined
              }
              published={article.published}
            />
          ) : null}

          <Pill>
            {article._type === 'contribution.guide' ? 'Guide' : 'Course'}
          </Pill>
        </div>
      </div>
    </div>
  )
}

function Pill({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={clsx(
        `relative z-10 flex items-center rounded-full bg-blue-500 px-3 py-1.5 text-white dark:bg-blue-500 dark:text-blue-50`,
        className,
      )}
    >
      <Subheading as="span" dark>
        {children}
      </Subheading>
    </span>
  )
}

type TabsProps = {
  current: string
  tabs: string[]
  onChange: (value: string) => void
}

const TAB_TITLES: Record<string, string> = {
  all: 'All',
  article: 'Blogs',
  'contribution.guide': 'Guides',
  talk: 'Talks',
  youTubeVideo: 'YouTube',
  course: 'Courses',
}

function Tabs({tabs, current, onChange}: TabsProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:hidden">
        <select
          name="timeline-tab"
          value={current}
          aria-label="Select a tab"
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-blue-950"
        >
          {tabs.map((tab) => (
            <option value={tab} key={tab}>
              {TAB_TITLES[tab] ?? tab}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-blue-500"
        />
      </div>
      <div className="sticky top-0 z-10 hidden bg-white lg:block dark:bg-blue-950">
        <div className="border-b border-gray-200 dark:border-blue-700">
          <nav aria-label="Tabs" className="-mb-px flex justify-between">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onChange(tab)}
                aria-current={tab === current ? 'page' : undefined}
                className={clsx(
                  tab === current
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                )}
              >
                <Subheading>{TAB_TITLES[tab] ?? tab}</Subheading>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
