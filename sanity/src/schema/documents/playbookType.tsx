import {defineField, defineType} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

export const playbookType = defineType({
  name: 'playbook',
  title: 'Playbook',
  icon: () => <HeroIcon icon="playbook" />,
  type: 'document',
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
      name: 'visibility',
      type: 'string',
      options: {
        list: ['home', 'public', 'hidden'],
      },
      initialValue: 'public',
    }),
    defineField({
      name: 'summary',
      type: 'portableText',
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({type: 'seo', name: 'seo', title: 'SEO'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'content',
      media: 'image',
    },
  },
})
