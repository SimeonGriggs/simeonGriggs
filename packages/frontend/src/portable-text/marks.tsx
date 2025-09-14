import type {PortableTextComponents} from '@portabletext/react'
import {Link} from 'react-router'

export const markComponents: Partial<PortableTextComponents> = {
  marks: {
    strong: ({children}) => (
      <strong className="font-semibold text-gray-950 dark:text-blue-50">
        {children}
      </strong>
    ),
    code: ({children}) => (
      <code className="text-[14px]/8 font-semibold text-blue-700 dark:text-blue-100">
        {children}
      </code>
    ),
    link: ({value, children}) => {
      return (
        <Link
          to={value.href}
          className="font-medium text-blue-500 underline decoration-blue-500 underline-offset-4 hover:bg-blue-500 hover:text-white hover:decoration-transparent dark:text-blue-100 dark:decoration-blue-100 dark:hover:text-white"
        >
          {children}
        </Link>
      )
    },
    reference: ({value, children}) => {
      return (
        <Link
          to={`/${value.slug}`}
          className="font-medium text-blue-500 underline decoration-blue-500 underline-offset-4 hover:bg-blue-500 hover:text-white hover:decoration-transparent dark:text-blue-100 dark:decoration-blue-100 dark:hover:text-white"
        >
          {children}
        </Link>
      )
    },
  },
}
