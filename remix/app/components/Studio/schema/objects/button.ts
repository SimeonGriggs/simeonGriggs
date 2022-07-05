import {LinkIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: LinkIcon,
  fields: [{name: 'link', type: 'link'}],
  preview: {
    select: {
      title: 'link.text',
      url: 'link.link',
      ref: 'link.reference.slug.current',
    },
    prepare({title, url, ref}) {
      return {
        title,
        subtitle: ref ?? url,
        media: LinkIcon,
      }
    },
  },
})
