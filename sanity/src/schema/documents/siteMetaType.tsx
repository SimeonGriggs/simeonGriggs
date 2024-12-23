import {defineField, defineType} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

export const siteMetaType = defineType({
  name: 'siteMeta',
  title: 'Site meta',
  icon: () => <HeroIcon icon="siteMeta" />,
  type: 'document',
  fields: [
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'author',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      type: 'portableText',
    }),
  ],
})
