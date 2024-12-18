import {LinkIcon} from '@heroicons/react/24/outline'
import type {PortableTextComponentProps} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {useCopyToClipboard} from 'usehooks-ts'

import {scrollableKey} from '~/lib/scrollableId'

function createCanonicalWithId(hash: string) {
  if (typeof document === 'undefined') {
    return null
  }

  return `${window.location.href}#${hash}`
}

type BlockHeadingButtonProps = {
  id: string
}

function BlockHeadingButton(props: BlockHeadingButtonProps) {
  const {id} = props
  const hashHref = createCanonicalWithId(id)
  const [, setCopiedText] = useCopyToClipboard()

  return (
    <button
      className="group  absolute inset-0"
      onClick={() => (hashHref ? setCopiedText(hashHref) : null)}
    >
      <LinkIcon className="absolute -left-6 top-1 h-auto w-6 -translate-x-6 tracking-tighter text-blue-500 opacity-0 transition duration-150 ease-in-out group-hover:-translate-x-0 group-hover:opacity-100" />
      <span className="sr-only">Copy link to this section</span>
    </button>
  )
}

export default function BlockHeading(props: PortableTextComponentProps<PortableTextBlock>) {
  const {value, children} = props

  const id = value._key ? scrollableKey(value._key) : undefined

  switch (props.value.style) {
    case 'h2':
      return (
        <h2 id={id} className="relative pr-10">
          {id ? <BlockHeadingButton id={id} /> : null}
          <>{children}</>
        </h2>
      )
    case 'h3':
      return (
        <h3 id={id} className="relative pr-10">
          {id ? <BlockHeadingButton id={id} /> : null}
          <>{children}</>
        </h3>
      )

    default:
      return (
        <p>
          <>{children}</>
        </p>
      )
  }
}
