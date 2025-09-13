import {ReactNode, HTMLAttributes} from 'react'
import {clsx} from 'clsx'

interface BlockH2Props extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
  dark?: boolean
}

export function BlockH2({
  children,
  className,
  dark = false,
  ...rest
}: BlockH2Props) {
  return (
    <h2
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        'data-dark:text-white mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0 dark:text-blue-100',
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  )
}
