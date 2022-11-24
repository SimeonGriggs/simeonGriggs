import {defineField, defineType} from 'sanity'

import HeroIcon from '../../components/HeroIcon'

export default defineType({
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
