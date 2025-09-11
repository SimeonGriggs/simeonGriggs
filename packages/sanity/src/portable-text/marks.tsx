import type {PortableTextComponents} from '@portabletext/react'
import {Link} from 'react-router'

export const markComponents: Partial<PortableTextComponents> = {
  marks: {
    strong: ({children}) => (
      <strong className="font-semibold text-gray-950">{children}</strong>
    ),
    code: ({children}) => (
      <code className="text-[15px]/8 font-semibold text-gray-950">
        {children}
      </code>
    ),
    link: ({value, children}) => {
      return (
        <Link
          to={value.href}
          className="font-medium text-blue-500 underline decoration-blue-500 underline-offset-4 hover:bg-blue-500 hover:text-white hover:decoration-blue-500"
        >
          {children}
        </Link>
      )
    },
    reference: ({value, children}) => {
      return (
        <Link
          to={`/${value.slug}`}
          className="font-medium text-blue-500 underline decoration-blue-500 underline-offset-4 hover:bg-blue-500 hover:text-white hover:decoration-blue-500"
        >
          {children}
        </Link>
      )
    },
  },
}
