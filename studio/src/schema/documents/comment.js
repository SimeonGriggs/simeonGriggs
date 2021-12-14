/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import sanityClient from 'part:@sanity/base/client'
import {CommentIcon} from '@sanity/icons'
import {Stack, Text} from '@sanity/ui'

import {blocksToText} from '../../lib/portableTextToPlainText'

const client = sanityClient.withConfig({
  apiVersion: `2021-03-25`,
})

const Content = React.forwardRef((props, ref) => {
  const {value} = props

  const [data, setData] = useState(null)
  useEffect(() => {
    function getData() {
      const query = `*[_type == "article" && $key in content[]._key][0].content[_key == $key]`
      const params = {key: value}
      client
        .fetch(query, params)
        .then((res) => {
          setData(res)
        })
        .catch((err) => console.error(err))
    }

    if (!data) {
      getData()
    }
  }, [])

  if (!data) return null

  return (
    <Stack space={3}>
      <Text size={1} weight="bold">
        Comment on:
      </Text>
      <Text size={1}>{blocksToText(data)}</Text>
    </Stack>
  )
})

Content.displayName = `Content`

export default {
  name: 'comment',
  title: 'Comment',
  icon: CommentIcon,
  type: 'document',
  fields: [
    {
      name: 'commentKey',
      title: 'Comment key',
      type: 'string',
      readOnly: true,
      inputComponent: Content,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'commentOn',
      title: 'Comment on',
      type: 'reference',
      to: [{type: 'article'}],
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'content',
      slug: 'commentOn.slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: `/${slug}`,
        media: CommentIcon,
      }
    },
  },
}
