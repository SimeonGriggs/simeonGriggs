import {defineField, defineType} from 'sanity'

import CommentPreview from '../../components/CommentPreview'
import HeroIcon from '../../components/HeroIcon'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'commentKey',
      title: 'Comment on block',
      type: 'string',
      readOnly: true,
      components: {
        input: CommentPreview,
      },
    }),
    defineField({
      name: 'commentOn',
      title: 'Comment on article',
      type: 'reference',
      to: [{type: 'article'}],
      readOnly: true,
    }),
    defineField({
      name: 'content',
      type: 'text',
      rows: 10,
      readOnly: true,
    }),
    defineField({
      name: 'name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      type: 'string',
      readOnly: true,
    }),
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
