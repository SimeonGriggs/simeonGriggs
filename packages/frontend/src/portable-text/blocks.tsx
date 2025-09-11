import type {PortableTextComponents} from '@portabletext/react'
import {BlockNormal} from '../components/block-normal'
import {BlockH2} from '../components/block-h2'
import {BlockH3} from '../components/block-h3'
import {BlockQuote} from '../components/block-quote'

export const blockComponents: Partial<PortableTextComponents> = {
  block: {
    normal: ({children}) => <BlockNormal>{children}</BlockNormal>,
    h2: ({children, value}) => (
      <BlockH2 id={`s-${value._key}`}>{children}</BlockH2>
    ),
    h3: ({children, value}) => (
      <BlockH3 id={`s-${value._key}`}>{children}</BlockH3>
    ),
    blockquote: ({children}) => <BlockQuote>{children}</BlockQuote>,
  },
}
