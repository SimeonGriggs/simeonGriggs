import {defineField, defineType} from 'sanity'

import CommentPreview from '~/sanity/components/CommentPreview'
import HeroIcon from '~/sanity/components/HeroIcon'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'commentKey',
      type: 'string',
      readOnly: true,
      components: {
        input: CommentPreview,
      },
    }),
    {
      name: 'commentOn',
      type: 'reference',
      to: [{type: 'article'}],
      readOnly: true,
    },
    {
      name: 'content',
      type: 'text',
      rows: 10,
      readOnly: true,
    },
    {
      name: 'name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      type: 'string',
      readOnly: true,
    },
  ],
  icon: () => <HeroIcon icon="comment" />,
  preview: {
    select: {
      title: 'content',
      slug: 'commentOn.slug.current',
    },
    prepare: (selection: {[key: string]: any}) => {
      const {title, slug} = selection

      return {
        title: title?.length > 50 ? `${title.slice(0, 30)}...` : title,
        subtitle: `/${slug}`,
        media: () => <HeroIcon icon="comment" />,
      }
    },
  },
})
