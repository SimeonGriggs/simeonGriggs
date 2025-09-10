import type {PortableTextComponents} from '@portabletext/react'

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
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        {children}
      </p>
    ),
    h1: ({children}) => (
      <h1 className="mt-16 text-4xl text-balance font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {children}
      </h1>
    ),
    h2: ({children}) => (
      <h2 className="mt-16 text-2xl text-balance font-bold tracking-tight text-zinc-800 sm:text-3xl dark:text-zinc-100">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-16 text-xl text-balance font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100">
        {children}
      </h3>
    ),
  },
}
