import React, {ReactNode} from 'react'
import {Link} from 'remix'

type MarkLinkProps = {
  children: ReactNode
  value: {
    _key: string
    _type: 'link'
    href?: string
  }
}

export default function MarkLink(props: MarkLinkProps) {
  const {value, children} = props
  const {href} = value ?? {}

  if (!href) {
    return <>{children}</>
  }

  const linkUrl = new URL(href)

  if (linkUrl.host === `www.simeongriggs.dev`) {
    return <Link to={linkUrl.pathname}>{children}</Link>
  }

  return <a href={href}>{children}</a>
}
