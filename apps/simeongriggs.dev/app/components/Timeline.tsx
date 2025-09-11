import type {
  ArticleStub,
  CombinedStubs,
  ExchangeStub,
  LearnStub,
  TalkStub,
  YouTubeVideoStub,
} from '~/types/stubs'
import {urlFor} from '~/sanity/helpers'
import {
  ChevronDownIcon,
  LinkIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'
import Published from './Published'
import {Link, useSearchParams} from 'react-router'
import type {Talk} from '~/types/talk'
import Label from './Label'
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
      <div className="relative">
        <div className="absolute -left-3 top-12 mt-px flex h-24 w-6 justify-center">
          <div className="w-px bg-gray-200 dark:bg-blue-800" />
        </div>
        <Tabs tabs={uniqueTypes} current={current} onChange={handleTabChange} />
      </div>
      <ul role="list" className="space-y-24">
        {articles
          .filter(
            (article) => current === DEFAULT_TAB || article._type === current,
          )
          .map((article, articleIdx) => (
            <li key={article._id} className="relative flex gap-x-4">
              <div
                className={clsx(
                  articleIdx === articles.length - 1 ? 'h-24' : '-bottom-24',
                  'absolute -left-3 top-0 flex w-6 justify-center',
                )}
              >
                <div className="w-px bg-gray-200 dark:bg-blue-800" />
              </div>

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
    <article className="relative flex justify-end pl-4 pr-8 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
      <div className="absolute left-0 flex size-6 flex-none -translate-x-3 items-center justify-center">
        <div className="absolute flex size-6 items-center justify-center rounded-full bg-blue-500 text-white ring-1 ring-white dark:ring-blue-900">
          <PencilSquareIcon aria-hidden="true" className="size-4" />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          {article.published ? (
            <Published
              updated={article.updated ?? undefined}
              published={article.published}
            />
          ) : null}
          <Pill>
            <Label tone="inherit">Blog</Label>
          </Pill>
        </div>
        <H2>
          <Link
            className="hover:text-blue-700 dark:hover:text-blue-100"
            to={`/${article.slug.current}`}
          >
            {article.title}
            <span aria-hidden="true">{` `}&rarr;</span>
            <span className="absolute inset-0"></span>
          </Link>
        </H2>
        <Summary>{article.summary}</Summary>
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
    <p
      className={clsx(`text-lg/8 text-gray-600 dark:text-blue-100`, className)}
    >
      {children}
    </p>
  )
}

function Video({article}: {article: YouTubeVideoStub}) {
  return (
    <article className="relative min-w-0">
      <div className="absolute left-0 top-6 z-10 flex size-6 flex-none -translate-x-3 items-center justify-center">
        <div className="absolute flex size-6 items-center justify-center rounded-full bg-blue-500 text-white ring-1 ring-white dark:ring-blue-900">
          <PlayIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
      </div>
      <div className="relative isolate flex aspect-[16/9] w-full flex-col justify-end overflow-hidden rounded-r-2xl bg-gray-900 transition-shadow duration-75 ease-in-out hover:shadow-xl">
        <img
          alt=""
          src={article.thumbnailUrl}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-600 via-blue-600/40" />
        <div className="absolute inset-0 -z-10 rounded-r-2xl ring-1 ring-inset ring-blue-700/10" />

        <div className="flex flex-col gap-3 overflow-hidden pb-8 pl-4 pr-8 text-gray-300 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
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
          <div className="flex items-center justify-between gap-3">
            {article.published ? (
              <Published published={article.published} tone="light" />
            ) : null}
            <Pill>
              <Label tone="inherit">YouTube</Label>
            </Pill>
          </div>
          <H2 tone="light">
            <span className="absolute inset-0" />
            {article.title}
          </H2>
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-4 pr-8 pt-8 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
        <Summary className="line-clamp-3">{article.summary}</Summary>
        {article.link ? (
          <p className="text-base/8 font-semibold text-blue-500 hover:text-blue-700 dark:hover:text-blue-100">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Watch on YouTube <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        ) : null}
      </div>
    </article>
  )
}

function Talk({article}: {article: TalkStub}) {
  return (
    <article className="relative w-full">
      <div className="absolute left-0 top-6 z-10 flex size-6 flex-none -translate-x-3 items-center justify-center">
        <div className="absolute flex size-6 items-center justify-center rounded-full bg-blue-500 text-white ring-1 ring-white dark:ring-blue-900">
          <MegaphoneIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
      </div>
      <div className="relative isolate flex aspect-[16/9] w-full flex-col justify-end overflow-hidden rounded-r-2xl bg-gray-900 transition-shadow duration-75 ease-in-out hover:shadow-xl">
        {article.image ? (
          <img
            alt=""
            src={
              urlFor(article.image)
                .width(1920)
                .height(1080)
                .auto('format')
                .url() || ''
            }
            className="absolute inset-0 -z-10 size-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-600 via-blue-600/40" />
        <div className="absolute inset-0 -z-10 rounded-r-2xl ring-1 ring-inset ring-blue-700/10" />

        <div className="flex flex-col gap-3 overflow-hidden pb-8 pl-4 pr-8 text-gray-300 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
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
          <div className="flex items-center justify-between gap-3">
            {article.published ? (
              <Published
                updated={article.updated ?? undefined}
                published={article.published}
                tone="light"
              />
            ) : null}
            <Pill>
              <Label tone="inherit">{article._type}</Label>
            </Pill>
          </div>
          <H2 tone="light">
            <span className="absolute inset-0" />
            {article.title}
          </H2>
          <h3 className="text-lg/6 font-semibold text-white">
            {article.event}
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-4 pr-8 pt-8 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
        <Summary>{article.summary}</Summary>
        {article.link ? (
          <p className="text-base/8 font-semibold text-blue-500 hover:text-blue-700">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Watch <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        ) : null}
      </div>
    </article>
  )
}

function Sanity({article}: {article: ExchangeStub | LearnStub}) {
  return (
    <div className="flex w-full justify-between pl-4 pr-8 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
      <div className="absolute left-0 top-1.5 flex size-6 flex-none -translate-x-3 items-center justify-center">
        <div className="absolute flex size-6 items-center justify-center rounded-full bg-[#f03e2f] text-white ring-1 ring-white dark:ring-blue-900">
          <LinkIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
      </div>
      <div className="flex w-full flex-col gap-4 py-0.5 text-lg/8 text-gray-500">
        <h2>
          <a
            className="font-medium text-gray-900 hover:text-[#f03e2f]"
            href={
              article._type === 'contribution.guide'
                ? `https://www.sanity.io/guides/${article.slug.current}`
                : `https://www.sanity.io/learn/course/${article.slug.current}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title}
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
        `relative z-10 rounded-full bg-blue-100 px-3 py-1.5 text-blue-500 dark:bg-blue-500 dark:text-blue-50`,
        className,
      )}
    >
      {children}
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
  article: 'Blog Posts',
  'contribution.guide': 'Guides',
  talk: 'Talks',
  youTubeVideo: 'YouTube',
  course: 'Courses',
}

function Tabs({tabs, current, onChange}: TabsProps) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:hidden">
        <select
          defaultValue={current}
          aria-label="Select a tab"
          onChange={(event) => onChange(event.target.value)}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
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
      <div className="hidden lg:block">
        <div className="border-b border-gray-200 lg:pl-[calc(100vw/16)] dark:border-blue-800">
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
                <Label>{TAB_TITLES[tab] ?? tab}</Label>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

function H2({
  children,
  tone = 'auto',
}: {
  children: React.ReactNode
  tone?: 'auto' | 'light' | 'dark'
}) {
  return (
    <h2
      className={clsx(
        'text-balance text-3xl font-black tracking-tighter md:text-4xl md:leading-none',
        tone === 'auto' && 'text-blue-500',
        tone === 'light' && 'text-white',
        tone === 'dark' && 'text-blue-700',
      )}
    >
      {children}
    </h2>
  )
}
