import {
  CodeIcon,
  CreditCardIcon,
  ImageIcon,
  JoystickIcon,
  PackageIcon,
  RemoveIcon,
} from '@sanity/icons'
import type {Rule} from 'sanity'
import {defineType} from 'sanity'

export const portableTextType = defineType({
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
        {
          title: 'Pre',
          value: 'pre',
        },
        {
          title: 'Code',
          value: 'code',
        },
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Strike', value: 'strike-through'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule: Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
          {
            name: 'reference',
            type: 'reference',
            to: [{type: 'article'}],
            options: {modal: {width: 'large'}},
          },
        ],
      },
    },
    {type: 'image', icon: ImageIcon},
    {type: 'code', icon: CodeIcon},
    {type: 'tldraw'},
    {type: 'button'},
    {type: 'video'},
    {type: 'break', icon: RemoveIcon},
    {type: 'codeSandbox', icon: PackageIcon},
    {type: 'object', name: 'talks', fields: [{name: 'thing', type: 'string'}], icon: JoystickIcon},
    {
      type: 'reference',
      name: 'gallery',
      icon: CreditCardIcon,
      to: [{type: 'media.tag'}],
    },
  ],
})
