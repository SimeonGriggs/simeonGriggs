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
  PencilSquareIcon,
  LinkIcon,
  MegaphoneIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'
import Published from './Published'
import {Link} from 'react-router'
import type {Talk} from '~/types/talk'
import Label from './Label'
import {useState} from 'react'
import clsx from 'clsx'

type TimelineProps = {
  articles: CombinedStubs
}

const DEFAULT_TAB = 'all'

export function Timeline({articles}: TimelineProps) {
  const uniqueTypes = [DEFAULT_TAB, ...new Set(articles.map((article) => article._type))]
  const [filter, setFilter] = useState(DEFAULT_TAB)

  return (
    <>
      <div className="relative">
        <div className="h-24 top-12 mt-px absolute -left-3 flex w-6 justify-center">
          <div className="w-px bg-gray-200 dark:bg-blue-800" />
        </div>
        <Tabs tabs={uniqueTypes} current={filter} onChange={(value) => setFilter(value)} />
      </div>
      <ul role="list" className="space-y-24">
        {articles
          .filter((article) => filter === DEFAULT_TAB || article._type === filter)
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
                    return <Featured article={article} />
                  case 'contribution.guide':
                    return <Exchange article={article} />
                  case 'talk':
                    return <Talk article={article} />
                  case 'youTubeVideo':
                    return <Video article={article} />
                  case 'course':
                    return <Exchange article={article} />
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

function Featured({article}: {article: ArticleStub}) {
  return (
    <article className="relative flex justify-end px-4 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
      <div className="absolute left-0 flex -translate-x-3 size-6 flex-none items-center justify-center">
        <div className="size-6 flex items-center justify-center bg-blue-500 text-white absolute rounded-full ring-2 ring-white dark:ring-blue-900">
          <PencilSquareIcon aria-hidden="true" className="size-4" />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-3">
          {article.published ? (
            <Published updated={article.updated ?? undefined} published={article.published} />
          ) : null}
          <span className="relative z-10 rounded-full bg-blue-100 dark:bg-blue-800 px-3 hover:bg-blue-100 py-1.5">
            <Label>Blog</Label>
          </span>
        </div>
        <h2
          className="text-3xl text-balance font-black tracking-tighter text-blue-500 md:text-4xl md:leading-none hover:text-blue-700
        dark:hover:text-blue-100
        "
        >
          <Link to={`/${article.slug.current}`}>
            {article.title}
            <span className="absolute inset-0"></span>
          </Link>
        </h2>
        <p className="text-lg/8 text-gray-600 dark:text-blue-100">{article.summary}</p>
      </div>
    </article>
  )
}

function Video({article}: {article: YouTubeVideoStub}) {
  return (
    <article className="relative min-w-0">
      <div className="absolute z-10 top-6 left-0 flex -translate-x-3 size-6 flex-none items-center justify-center">
        <div className="size-6 flex items-center justify-center bg-blue-500 text-white absolute rounded-full ring-2 ring-white dark:ring-blue-900">
          <PlayIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
      </div>
      <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-r-2xl bg-gray-900 aspect-[16/9] pb-8 w-full shadow-xl">
        <img
          alt=""
          src={article.thumbnailUrl}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-600 via-blue-600/40" />
        <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue-700/10" />

        <div className="flex flex-col overflow-hidden gap-3 text-gray-300 px-4 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
          <div className="flex justify-between items-center gap-3">
            {article.published ? <Published published={article.published} tone="light" /> : null}
            <span className="relative z-10 rounded-full bg-gray-50 px-3 hover:bg-blue-100 py-1.5">
              <Label tone="dark">YouTube</Label>
            </span>
          </div>
          <h2 className="text-3xl text-balance font-black tracking-tighter text-white md:text-4xl md:leading-none">
            <span className="absolute inset-0" />
            {article.title}
          </h2>
          {/* <h3 className="text-lg/6 font-semibold text-white">{article.event}</h3> */}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-8 px-4 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
        <p className="text-lg/8 text-gray-600 dark:text-blue-100 line-clamp-3">{article.summary}</p>
        {article.link ? (
          <p className="text-base/8 text-blue-500 hover:text-blue-700 dark:hover:text-blue-100 font-semibold">
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
    <article className="relative">
      <div className="absolute z-10 top-6 left-0 flex -translate-x-3 size-6 flex-none items-center justify-center">
        <div className="size-6 flex items-center justify-center bg-blue-500 text-white absolute rounded-full ring-2 ring-white dark:ring-blue-900">
          <MegaphoneIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
      </div>
      <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-r-2xl bg-gray-900 aspect-[16/9] pb-8 w-full shadow-xl">
        {article.image ? (
          <img
            alt=""
            src={urlFor(article.image).width(1920).height(1080).url() || ''}
            className="absolute inset-0 -z-10 size-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-600 via-blue-600/40" />
        <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue-700/10" />

        <div className="flex flex-col overflow-hidden gap-3 text-gray-300 px-4 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
          <div className="flex justify-between items-center gap-3">
            {article.published ? (
              <Published
                updated={article.updated ?? undefined}
                published={article.published}
                tone="light"
              />
            ) : null}
            <span className="relative z-10 rounded-full bg-gray-50 px-3 hover:bg-blue-100 py-1.5">
              <Label tone="dark">{article._type}</Label>
            </span>
          </div>
          <h2 className="text-3xl text-balance font-black tracking-tighter text-white md:text-4xl md:leading-none">
            <span className="absolute inset-0" />
            {article.title}
          </h2>
          <h3 className="text-lg/6 font-semibold text-white">{article.event}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-8 px-4 md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
        <p className="text-lg/8 text-gray-600 dark:text-blue-100">{article.summary}</p>
        {article.link ? (
          <p className="text-base/8 text-blue-500 hover:text-blue-700 font-semibold">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Watch on YouTube <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        ) : null}
      </div>
    </article>
  )
}

function Exchange({article}: {article: ExchangeStub | LearnStub}) {
  return (
    <div className="flex justify-between w-full md:px-[calc(100vw/12)] lg:px-[calc(100vw/16)]">
      <div className="absolute left-0 flex -translate-x-3 size-6 flex-none items-center justify-center">
        <div
          className="size-6 flex items-center justify-center bg-[#f03e2f] text-white absolute rounded-full ring-2 ring-white
        dark:ring-blue-900"
        >
          <LinkIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
      </div>
      <div className="py-0.5 text-sm/5 text-gray-500 flex flex-col w-full gap-4">
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
        <p className="text-gray-600 dark:text-blue-100">{article.summary}</p>

        <div className="flex justify-between items-center gap-3">
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
          <span className="relative z-10 rounded-full bg-gray-50 px-3 hover:bg-blue-100 py-1.5">
            <Label>{article._type === 'contribution.guide' ? 'Guide' : 'Course'}</Label>
          </span>
        </div>
      </div>
    </div>
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
  youTubeVideo: 'Videos',
  course: 'Courses',
}

function Tabs({tabs, current, onChange}: TabsProps) {
  return (
    <div className="sticky top-0">
      <div className="grid grid-cols-1 sm:hidden">
        <select
          defaultValue={DEFAULT_TAB}
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
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200 dark:border-blue-800 md:pl-[calc(100vw/12)] lg:pl-[calc(100vw/16)]">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
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
