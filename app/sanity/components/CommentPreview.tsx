import {Card, Stack, Text} from '@sanity/ui'
import type {StringInputProps} from 'sanity'

export default function CommentPreview(props: StringInputProps) {
  return (
    <Card tone="primary" padding={3} border radius={2}>
      <Stack space={2}>
        <Text>CommentPreview</Text>
        {props.renderDefault(props)}
      </Stack>
    </Card>
  )
}
