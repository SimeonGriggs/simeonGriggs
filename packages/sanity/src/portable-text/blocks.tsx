import type {PortableTextComponents} from '@portabletext/react'

export const blockComponents: Partial<PortableTextComponents> = {
  block: {
    normal: ({children}) => (
      <p className="my-10 text-base/8 first:mt-0 last:mb-0">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="mb-10 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
        {children}
      </h3>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
        {children}
      </blockquote>
    ),
  },
}
