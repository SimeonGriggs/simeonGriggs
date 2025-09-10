import type {PortableTextComponents} from '@portabletext/react'
import {Link} from 'react-router'

import {image} from './image'

export const componentsSummary: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="mt-6 text-xl text-blue-700 dark:text-blue-300">
        {children}
      </p>
    ),
  },
}

export const components: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="my-10 text-base/8 first:mt-0 last:mb-0">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="mt-12 mb-10 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-12 mb-10 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
        {children}
      </h3>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({value}) => (
      <img
        alt={value.alt || ''}
        src={image(value).width(2000).url()}
        className="w-full rounded-2xl"
      />
    ),
    separator: ({value}) => {
      switch (value.style) {
        case 'line':
          return <hr className="my-8 border-t border-gray-200" />
        case 'space':
          return <div className="my-8" />
        default:
          return null
      }
    },
  },
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
  marks: {
    strong: ({children}) => (
      <strong className="font-semibold text-gray-950">{children}</strong>
    ),
    code: ({children}) => (
      <>
        <span aria-hidden>`</span>
        <code className="text-[15px]/8 font-semibold text-gray-950">
          {children}
        </code>
        <span aria-hidden>`</span>
      </>
    ),
    link: ({value, children}) => {
      return (
        <Link
          to={value.href}
          className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-hover:decoration-gray-600"
        >
          {children}
        </Link>
      )
    },
  },
}
