import {PlayIcon} from '@heroicons/react/24/outline'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Video URL',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
})
