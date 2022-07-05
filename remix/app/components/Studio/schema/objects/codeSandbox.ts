import {defineType} from 'sanity'

export default defineType({
  name: 'codeSandbox',
  type: 'object',
  title: 'Code Sandbox',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
})
