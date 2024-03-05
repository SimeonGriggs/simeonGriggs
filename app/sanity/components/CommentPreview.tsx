import {Stack} from '@sanity/ui'
import type {StringInputProps} from 'sanity'

export default function CommentPreview(props: StringInputProps) {
  return (
    <Stack space={2}>
      <div>CommentPreview</div>
      {props.renderDefault(props)}
    </Stack>
  )
}
