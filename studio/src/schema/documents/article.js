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
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'published',
      title: 'Published',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'updated',
      title: 'Updated',
      type: 'date',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {type: 'seo', name: 'seo'},
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
}
