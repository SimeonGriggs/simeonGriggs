import {defineField, defineType} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

export const tailwindType = defineType({
  name: 'tailwind',
  title: 'Tailwind',
  icon: () => <HeroIcon icon="tailwind" />,
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
