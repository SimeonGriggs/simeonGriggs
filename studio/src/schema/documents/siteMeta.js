import {CogIcon} from '@sanity/icons'

export default {
  name: 'siteMeta',
  title: 'Site meta',
  icon: CogIcon,
  type: 'document',
  fields: [
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'portableText',
    },
  ],
}
