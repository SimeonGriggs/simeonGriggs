import {LinkIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  // @ts-ignore
  icon: LinkIcon,
  fields: [{name: 'link', type: 'link'}],
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
