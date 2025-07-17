import process from 'node:process'

import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

const {BOT_TOKEN, CHAT_ID} = process.env
if (!BOT_TOKEN || !CHAT_ID) {
  throw new Error('BOT_TOKEN and CHAT_ID must be set')
}

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'update-tints-readme',
      event: {
        on: ['publish'],
        filter: "_type == 'tailwind' && defined(content)",
        projection: '_rev, _updatedAt, content',
      },
    }),
    defineDocumentFunction({
      name: 'comment-telegram',
      event: {
        on: ['publish'],
        filter: '_type == "comment" && defined(content)',
        projection: '_id, content',
      },
      env: {BOT_TOKEN, CHAT_ID},
    }),
  ],
})
