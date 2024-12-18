import type {PortableTextComponentProps} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

import {scrollableKey} from '~/lib/scrollableId'

export default function BlockHeadingTOC(props: PortableTextComponentProps<PortableTextBlock>) {
  const {value, children} = props

  const href = value._key ? `#${scrollableKey(value._key)}` : undefined

  return (
    <li>
      <a
        href={href}
        className={`block text-blue-500 hover:bg-blue-500 hover:text-white dark:text-blue-200 dark:hover:text-white ${
          value.style === 'h3' ? 'pl-3 -indent-3' : ''
        }`}
      >
        {value.style === 'h3' ? '- ' : ''}
        {children}
      </a>
    </li>
  )
}
