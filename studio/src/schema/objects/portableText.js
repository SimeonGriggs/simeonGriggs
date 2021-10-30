import React from 'react'

const CodeRender = (props) => {
  const {children, style = 'span'} = props

  return React.createElement(
    style,
    {
      style: {
        display: `block`,
        backgroundColor: `#efefef`,
        padding: `1rem`,
        overflowX: style === `pre` ? `scroll` : `auto`,
        fontFamily:
          'JetBrains Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      },
    },
    children ?? style
  )
}

export default {
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        // {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        // {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
        // {title: 'Figure', value: 'figure'},
        {
          title: 'Pre',
          value: 'pre',
          blockEditor: {
            render: CodeRender,
          },
        },
        {
          title: 'Code',
          value: 'code',
          blockEditor: {
            render: CodeRender,
          },
        },
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
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
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    // {type: 'mainImage'},
    {type: 'image'},
    {
      type: 'code',
      // options: {language: 'js', languageAlternatives: ['js']}
    },
    {type: 'button'},
    // {type: 'download'},
    {type: 'video'},
    // {type: 'pageBuilderHero'},
    // {type: 'pageBuilderContent'},
    // {type: 'pageBuilderColumns'},
    // {type: 'pageBuilderImage'},
    // {type: 'pageBuilderProducts'},
    // {type: 'cloudinary.asset'},
  ],
}
