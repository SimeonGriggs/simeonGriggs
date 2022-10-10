import React from 'react'
import {PortableText} from '~/lib/sanity/helpers'
import type {Block, CommentDocument} from '~/lib/sanity/types'

type ProseableTextProps = {
  blocks: Block[]
  comments?: CommentDocument[] | false
}

/**
 * Use Tailwind CSS's `prose` classes with Portable Text markup (blocks)
 * Without inheriting styles for custom components (types)
 * https://www.sanity.io/guides/tailwindcss-typography-prose-portable-text
 */
export default function ProseableText(props: ProseableTextProps) {
  const {blocks, comments} = props

  if (!blocks?.length) return null

  // Group together standard `_type === "block"`  blocks
  // eg <p>, <li>, etc – and separate out everyone else
  // Also use this opportunity to insert comments
  const blockGroups: Block[][] = blocks.reduce(
    (acc: Block[][], item: Block) => {
      const lastIdx = acc.length - 1

      const blockComments = comments?.length
        ? comments.filter((comment) => comment.commentKey === item._key)
        : []

      if (blockComments.length) {
        item.comments = blockComments
      }

      if (
        // We don't have items in this group yet
        acc[lastIdx].length === 0 ||
        // The last group has the same `type`
        acc[lastIdx][0]._type === item._type
      ) {
        acc[lastIdx].push(item)
      } else {
        // Time to create a new group, because the `type` is different compared to last group
        acc.push([item])
      }

      return acc
    },
    [[]]
  )

  if (!blockGroups?.length) return null

  return (
    <>
      {blockGroups.map((group) =>
        group[0]._type === 'block' ? (
          <div
            key={group[0]._key}
            className="prose prose-blue selection:bg-pink-100 selection:text-pink-900 dark:prose-dark dark:selection:bg-pink-800 dark:selection:text-pink-100 md:prose-lg"
          >
            {group.length > 0 ? <PortableText value={group} comments={Boolean(comments)} /> : null}
          </div>
        ) : (
          <React.Fragment key={group[0]._key}>
            {group.length > 0 ? (
              <PortableText key={group[0]._key} value={group} comments={Boolean(comments)} />
            ) : null}
          </React.Fragment>
        )
      )}
    </>
  )
}
