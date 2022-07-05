import {defineType, defineField, Rule} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

export default defineType({
  name: 'article',
  title: 'Article',
  icon: HeroIcon,
  type: 'document',
  orderings: [
    {
      title: 'Published',
      name: 'publishedDesc',
      by: [{field: 'published', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: `unlisted`,
      type: `boolean`,
      initialValue: false,
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      type: 'date',
      hidden: (props) => Boolean(props?.document?.unlisted),
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (document?.unlisted) {
            return true
          }

          return value ? true : 'Published date is required'
        }),
    }),
    defineField({
      name: 'updated',
      type: 'date',
      hidden: (props) => Boolean(props?.document?.unlisted),
    }),
    defineField({
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
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {hotspot: true},
    }),
    defineField({type: 'seo', name: 'seo', title: 'SEO'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
})
