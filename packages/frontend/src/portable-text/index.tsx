import type {PortableTextComponents} from '@portabletext/react'
import {blockComponents} from './blocks'
import {listComponents} from './lists'
import {markComponents} from './marks'
import {typeComponents} from './types'

export const components: PortableTextComponents = {
  ...blockComponents,
  ...typeComponents,
  ...listComponents,
  ...markComponents,
}
