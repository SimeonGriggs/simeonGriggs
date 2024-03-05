import {defineType} from 'sanity'

export const codeSandboxType = defineType({
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
