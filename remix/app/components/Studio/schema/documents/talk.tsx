import {defineType, defineField, Rule} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

export default defineType({
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
      title: 'Content',
      type: 'portableText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
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
