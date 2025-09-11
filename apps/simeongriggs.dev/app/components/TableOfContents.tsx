import {type PortableTextBlock} from '@portabletext/react'
import {Link} from 'react-router'
import {scrollableKey} from '~/lib/scrollableId'

type TableOfContentsProps = {
  value: PortableTextBlock[]
}

export default function TableOfContents(props: TableOfContentsProps) {
  const headings = props.value.map((heading) => ({
    id: scrollableKey(heading._key ?? ''),
    title: heading.children[0].text,
  }))

  return (
    <div className="sticky top-3">
      <ul className="grid grid-cols-1 gap-3">
        {headings.map((heading) => (
          <li className="flex items-start gap-4 text-balance text-base/7 text-gray-950/75">
            <Link to={`#${heading.id}`}>{heading.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
