import React from 'react'

export default function Label({children, as}: {children: React.ReactNode; as?: React.ElementType}) {
  const Component = as || 'p'

  return (
    <Component className="font-mono text-xs uppercase text-blue-700 dark:text-blue-100">
      {children}
    </Component>
  )
}
