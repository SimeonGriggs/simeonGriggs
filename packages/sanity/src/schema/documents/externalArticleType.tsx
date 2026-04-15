import type {Rule} from 'sanity'
import {defineField, defineType} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

const SOURCE_VALUES = ['planetscale', 'sanity_guides', 'sanity_learn'] as const

type ExternalArticleSource = (typeof SOURCE_VALUES)[number]

type UnlistedDoc = {unlisted?: boolean; source?: ExternalArticleSource}
type HiddenProps = {document?: UnlistedDoc}

function validateUrlForSource(
  url: string | undefined,
  source: ExternalArticleSource | undefined,
) {
  if (!url || !source) return true

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return 'URL must be valid'
  }

  if (parsed.protocol !== 'https:') return 'URL must be https'

  const host = parsed.hostname
  const path = parsed.pathname

  if (source === 'planetscale') {
    if (host !== 'planetscale.com') return 'PlanetScale URLs must be on planetscale.com'
    if (!path.startsWith('/blog/')) return 'PlanetScale URLs must start with /blog/'
  }

  if (source === 'sanity_guides') {
    if (host !== 'www.sanity.io') return 'Sanity guide URLs must be on www.sanity.io'
    if (!path.startsWith('/guides/')) return 'Sanity guide URLs must start with /guides/'
  }

  if (source === 'sanity_learn') {
    if (host !== 'www.sanity.io') return 'Sanity learn URLs must be on www.sanity.io'
    if (!path.startsWith('/learn/course/'))
      return 'Sanity learn URLs must start with /learn/course/'
  }

  return true
}

export const externalArticleType = defineType({
  name: 'externalArticle',
  title: 'External Article',
  icon: () => <HeroIcon icon="link" />,
  type: 'document',
  orderings: [
    {
      title: 'Published',
      name: 'publishedDesc',
      by: [{field: 'published', direction: 'desc'}],
    },
  ],
  fieldsets: [{name: 'dates', title: 'Dates', options: {columns: 2}}],
  fields: [
    defineField({
      name: 'unlisted',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'source',
      type: 'string',
      options: {
        list: [
          {title: 'PlanetScale', value: 'planetscale'},
          {title: 'Sanity Guides', value: 'sanity_guides'},
          {title: 'Sanity Learn', value: 'sanity_learn'},
        ],
      },
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule: Rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .custom((value: unknown, {document}: {document?: UnlistedDoc}) =>
            validateUrlForSource(
              typeof value === 'string' ? value : undefined,
              document?.source,
            ),
          ),
    }),
    defineField({
      name: 'published',
      type: 'date',
      fieldset: 'dates',
      hidden: (props: HiddenProps) => Boolean(props?.document?.unlisted),
      validation: (rule: Rule) =>
        rule.custom((value: unknown, {document}: {document?: UnlistedDoc}) => {
          if (document?.unlisted) return true
          return typeof value === 'string' && value ? true : 'Published date is required'
        }),
    }),
    defineField({
      name: 'updated',
      type: 'date',
      fieldset: 'dates',
      hidden: (props: HiddenProps) => Boolean(props?.document?.unlisted),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
      hidden: (props: HiddenProps) => Boolean(props?.document?.unlisted),
      validation: (rule: Rule) =>
        rule.custom((value: unknown, {document}: {document?: UnlistedDoc}) => {
          if (document?.unlisted) return true
          return typeof value === 'string' && value ? true : 'Summary is required'
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      source: 'source',
      url: 'url',
    },
    prepare({
      title,
      source,
      url,
    }: {
      title?: string
      source?: string
      url?: string
    }) {
      return {
        title,
        subtitle: [source, url].filter(Boolean).join(' • '),
      }
    },
  },
})

