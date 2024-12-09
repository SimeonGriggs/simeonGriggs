// import type {PortableTextBlock} from '@portabletext/types'
// import {Text} from '@sanity/ui'
import type {
  // Reference,
  StringInputProps,
} from 'sanity'
// import {useFormValue} from 'sanity'
// import {useListeningQuery} from 'sanity-plugin-utils'

export default function CommentPreview(props: StringInputProps) {
  //   const reference = useFormValue(['commentOn']) as Reference
  //   const {data} = useListeningQuery(`*[_id == $id][0].content[_key == $key]`, {
  //     params: {id: reference?._ref || '', key: props?.value || ''},
  //   })
  //   const plainText = Array.isArray(data) ? blocksToText(data) : ''

  //   return plainText ? <Text>{plainText}</Text> : props.renderDefault(props)
  return props.renderDefault(props)
}

// https://www.sanity.io/schemas/portable-text-to-plain-text-cc845843
// const defaults = {nonTextBehavior: 'remove'}

// function blocksToText(blocks: PortableTextBlock[], opts = {}) {
//   const options = Object.assign({}, defaults, opts)
//   return blocks
//     .map((block) => {
//       if (block._type !== 'block' || !block.children) {
//         return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
//       }

//       return block.children.map((child) => child.text).join('')
//     })
//     .join('\n\n')
// }
