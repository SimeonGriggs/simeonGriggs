import type {Block} from '~/lib/sanity/types'

export default function TableOfContents({blocks}: {blocks: Block[]}) {
  const headings = blocks.filter((block) => ['h2', 'h3'].includes(block.style))

  if (!headings?.length) {
    return null
  }

  return (
    <ul className="grid grid-cols-1 gap-y-4 font-mono text-xs sticky top-0">
      {headings.map((heading) => (
        <li
          key={heading._key}
          className={heading.style === 'h3' ? `pl-3` : ``}
          style={{textIndent: heading.style === 'h3' ? `-0.75rem` : ``}}
        >
          <a
            href={`#${heading._key}`}
            className="text-blue-500 dark:text-blue-200 hover:text-white dark:hover:text-white hover:bg-blue-500 block"
          >
            {heading.style === 'h3' ? `– ` : ``}
            {heading.children.map((child) => child.text).join('')}
          </a>
        </li>
      ))}
    </ul>
  )
}
