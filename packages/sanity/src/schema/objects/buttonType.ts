import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const buttonType = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: LinkIcon,
  fields: [defineField({name: 'link', type: 'link'})],
  preview: {
    select: {
      title: 'link.text',
      url: 'link.link',
      ref: 'link.reference.slug.current',
    },
    prepare: (selection: {[key: string]: any}) => {
      const {title, url, ref} = selection

      return {
        title,
        subtitle: ref ?? url,
        media: LinkIcon,
      }
    },
  },
})
