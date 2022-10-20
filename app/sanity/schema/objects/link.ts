import type {Rule} from 'sanity'

export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: `text`,
      type: `string`,
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: `reference`,
      type: `reference`,
      description: `If this link has a reference and a URL, the reference will be used`,
      to: [{type: 'article'}],
    },
    {
      name: `link`,
      type: `url`,
      description: `Must be a full URL`,
      validation: (Rule: Rule) =>
        Rule.custom((url: string | null) =>
          url && url.startsWith('http://') ? 'Please start links with https://' : true
        ),
    },
  ],
  preview: {
    select: {
      title: 'text',
      url: 'link',
      ref: 'reference.slug.current',
    },
    prepare: (selection: {[key: string]: any}) => {
      const {title, url, ref} = selection

      const subtitle = !url && !ref ? `Empty Link` : ref ?? url

      return {
        title: title ?? '',
        subtitle,
      }
    },
  },
}
