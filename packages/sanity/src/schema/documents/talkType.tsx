import {defineField, defineType} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

export const talkType = defineType({
  name: 'talk',
  title: 'Talk',
  icon: () => <HeroIcon icon="talk" />,
  type: 'document',
  orderings: [
    {title: 'Event Date', name: 'eventDateDesc', by: [{field: 'eventDate', direction: 'desc'}]},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'event',
      type: 'string',
    }),
    defineField({
      name: 'eventDate',
      type: 'date',
    }),
    defineField({
      name: 'location',
      description: 'Leave blank for online event',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'url',
    }),
    defineField({
      name: 'video',
      type: 'video',
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {hotspot: true},
    }),
    defineField({type: 'seo', name: 'seo', title: 'SEO'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'event',
      media: 'image',
    },
  },
})
