import type {ReactNode, HTMLAttributes} from 'react'
import {clsx} from 'clsx'

interface BlockNormalProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

export function BlockNormal({children, className, ...rest}: BlockNormalProps) {
  return (
    <p
      className={clsx(
        'my-10 text-base/8 first:mt-0 last:mb-0 dark:text-white',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}
