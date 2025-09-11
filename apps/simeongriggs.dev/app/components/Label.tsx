import clsx from 'clsx'
import React from 'react'

export type LabelTones = 'auto' | 'light' | 'dark' | 'inherit'

export default function Label({
  children,
  as,
  tone = 'auto',
}: {
  children: React.ReactNode
  as?: React.ElementType
  tone?: LabelTones
}) {
  const Component = as || 'p'

  return (
    <Component
      className={clsx(
        `font-mono text-xs uppercase`,
        tone === 'auto' && `text-blue-500`,
        tone === 'light' && `text-white`,
        tone === 'dark' && `text-blue-700`,
      )}
    >
      {children}
    </Component>
  )
}
