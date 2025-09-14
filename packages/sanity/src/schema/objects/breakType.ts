import {defineField, defineType} from 'sanity'

export const breakType = defineType({
  name: 'break',
  type: 'object',
  title: 'Break',
  fields: [
    defineField({
      name: 'style',
      type: 'string',
      options: {
        list: ['break', 'readMore'],
      },
    }),
  ],
})
