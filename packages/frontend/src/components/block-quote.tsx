import {ReactNode, HTMLAttributes} from 'react'
import {clsx} from 'clsx'

interface BlockQuoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children?: ReactNode
}

export function BlockQuote({children, className, ...rest}: BlockQuoteProps) {
  return (
    <blockquote
      className={clsx(
        'my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0 dark:border-l-gray-600 dark:text-gray-50',
        className,
      )}
      {...rest}
    >
      {children}
    </blockquote>
  )
}
