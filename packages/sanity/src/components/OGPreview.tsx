import {Card, Code, Flex} from '@sanity/ui'
import {useMemo} from 'react'

export default function OGPreview({document, options}: any) {
  const {displayed} = document
  const url = useMemo(() => options.url(displayed), [displayed, options])

  return (
    <Flex
      height="fill"
      direction="column"
      align="flex-start"
      padding={5}
      gap={5}
    >
      <Card shadow={2}>
        <Flex>
          <img
            src={url}
            alt="OG Preview"
            style={{width: `100%`, height: `auto`}}
          />
        </Flex>
      </Card>
      <Code style={{overflow: 'scroll'}} size={0}>
        {url}
      </Code>
    </Flex>
  )
}
