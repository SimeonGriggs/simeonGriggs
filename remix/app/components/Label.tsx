import React from 'react'

export default function Label({children}: {children: React.ReactNode}) {
  return <p className="font-mono text-xs uppercase text-blue-700 dark:text-blue-100">{children}</p>
}
