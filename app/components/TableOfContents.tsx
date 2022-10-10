import {scrollableKey} from '~/lib/utils/scrollableId'
import type {TypedObjectBlock} from '~/types/block'
import Label from './Label'

type TableOfContentsProps = {
  value: TypedObjectBlock[]
}

export default function TableOfContents(props: TableOfContentsProps) {
  const {value} = props

  return (
    <>
      <ul className="sticky top-12 grid grid-cols-1 gap-y-4 font-mono text-xs">
        <Label>Table of Contents</Label>
        {value.map((heading) => (
          <li key={heading._key}>
            <a
              href={`#${scrollableKey(heading._key)}`}
              className={`block text-blue-500 hover:bg-blue-500 hover:text-white dark:text-blue-200 dark:hover:text-white ${
                heading.style === 'h3' ? 'pl-3 -indent-3' : ''
              }`}
            >
              {heading.children
                ? heading.children
                    .map((child, index) =>
                      index === 0 && heading.style === 'h3' ? `- ${child.text}` : child.text
                    )
                    .join('')
                : ``}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
