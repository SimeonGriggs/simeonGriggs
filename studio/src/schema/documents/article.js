import {IceCreamIcon} from '@sanity/icons'

export default {
  name: 'article',
  title: 'Article',
  icon: IceCreamIcon,
  type: 'document',
  orderings: [
    {
      title: 'Published',
      name: 'publishedDesc',
      by: [{field: 'published', direction: 'desc'}],
    },
  ],
  fields: [
    {
      name: `unlisted`,
      type: `boolean`,
      initialValue: false,
    },
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'published',
      type: 'date',
      hidden: ({document}) => document?.unlisted,
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (document?.unlisted) {
            return true
          }

          return value ? true : 'Published date is required'
        }),
    },
    {
      name: 'updated',
      type: 'date',
      hidden: ({document}) => document?.unlisted,
    },
    {
      name: 'summary',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (document?.unlisted) {
            return true
          }

          return value ? true : 'Summary is required'
        }),
    },
    {
      name: 'content',
      type: 'portableText',
    },
    {
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {hotspot: true},
    },
    {type: 'seo', name: 'seo', title: 'SEO'},
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
}
