import {PortableText} from '~/lib/sanity/helpers'
import {Block, CommentDocument} from '~/lib/sanity/types'

/**
 * Use Tailwind CSS's `prose` classes with Portable Text markup (blocks)
 * Without inheriting styles for custom components (types)
 * https://www.sanity.io/guides/tailwindcss-typography-prose-portable-text
 */
export default function ProseableText({
  blocks,
  comments,
}: {
  blocks: Block[]
  comments: CommentDocument[]
}) {
  // Group together standard `_type === "block"`  blocks
  // eg <p>, <li>, etc – and separate out everyone else
  // Also use this opportunity to insert comments
  const blockGroups = blocks.reduce(
    (acc, item) => {
      const lastIdx = acc.length - 1

      const blockComments = comments.filter((comment) => comment.commentKey === item._key)
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
            className="prose md:prose-lg dark:prose-dark prose-blue my-4 md:my-8"
          >
            <PortableText blocks={group} />
          </div>
        ) : (
          <PortableText key={group[0]._key} blocks={group} />
        )
      )}
    </>
  )
}
