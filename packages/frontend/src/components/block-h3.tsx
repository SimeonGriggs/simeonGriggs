import {ReactNode, HTMLAttributes} from 'react'
import {clsx} from 'clsx'

interface BlockH3Props extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
}

export function BlockH3({children, className, ...rest}: BlockH3Props) {
  return (
    <h3
      className={clsx(
        'mb-10 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0 dark:text-blue-100',
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  )
}
