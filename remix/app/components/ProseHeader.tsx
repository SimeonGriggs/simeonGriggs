import React from 'react'
import {LinkIcon} from '@heroicons/react/solid'
import {useCopyToClipboard} from 'usehooks-ts'

import {BlockItem} from '~/lib/sanity/types'
import {scrollableKey} from '~/lib/utils/scrollableId'

function createCanonicalWithId(hash: string) {
  if (typeof window === 'undefined') {
    return null
  }

  return `${window.location.href}#${hash}`
}

function ProseHeaderChildren({children}: {children: React.ReactNode | string}) {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-end transition-opacity duration-200 opacity-0 group-hover:opacity-100">
        <LinkIcon className="w-5 h-auto" />
      </span>
      {children}
    </>
  )
}

export default function ProseHeader(props: BlockItem) {
  const {children, node} = props

  const [, setCopiedText] = useCopyToClipboard()
  const id = scrollableKey(node._key)
  const hashHref = createCanonicalWithId(id)

  return React.createElement(
    node.style,
    {
      id,
      onClick: () => (hashHref ? setCopiedText(hashHref) : null),
      className: `pr-10 relative group hover:cursor-pointer`,
    },
    ProseHeaderChildren({children})
  )
}
