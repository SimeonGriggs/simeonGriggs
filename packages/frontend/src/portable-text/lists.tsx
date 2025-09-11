import type {PortableTextComponents} from '@portabletext/react'

export const listComponents: Partial<PortableTextComponents> = {
  list: {
    bullet: ({children}) => (
      <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}) => {
      return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>
    },
    number: ({children}) => {
      return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>
    },
  },
}
