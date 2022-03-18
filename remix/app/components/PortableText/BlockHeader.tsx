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

function BlockHeaderChildren({children}: {children: React.ReactNode | string}) {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <LinkIcon className="h-auto w-5" />
      </span>
      {children}
    </>
  )
}

export default function BlockHeader(props: BlockItem) {
  const {children, value} = props

  const [, setCopiedText] = useCopyToClipboard()
  const id = scrollableKey(value._key)
  const hashHref = createCanonicalWithId(id)

  return React.createElement(
    value.style,
    {
      id,
      onClick: () => (hashHref ? setCopiedText(hashHref) : null),
      className: `pr-10 relative group hover:cursor-pointer`,
    },
    BlockHeaderChildren({children})
  )
}
