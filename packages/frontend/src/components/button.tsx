import {clsx} from 'clsx'
import type {AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react'
import {Link} from 'react-router'
import type {LinkProps} from 'react-router'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-gray-950 shadow-md',
    'text-base font-medium whitespace-nowrap text-white',
    'data-disabled:bg-gray-950 data-disabled:opacity-40 data-hover:bg-gray-800',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'text-base font-medium whitespace-nowrap text-gray-950',
    'data-disabled:bg-white/15 data-disabled:opacity-40 data-hover:bg-white/20',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)]',
    'rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
    'text-sm font-medium whitespace-nowrap text-gray-950',
    'data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-gray-50',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
} & (
  | LinkProps
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
)

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (
    props.type === 'button' ||
    props.type === 'submit' ||
    props.type === 'reset'
  ) {
    return (
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        className={className}
      >
        {children}
      </button>
    )
  }

  if ('href' in props) {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link {...(props as LinkProps)} className={className}>
      {children}
    </Link>
  )
}
