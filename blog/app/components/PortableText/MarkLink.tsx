import type {PortableTextMarkComponentProps} from '@portabletext/react'
import {Link} from 'react-router'
import {z} from 'zod'

import {baseTypedObjectZ} from '~/types/block'

export const typedObjectLinkZ = baseTypedObjectZ.extend({
  _type: z.literal('link'),
  href: z.string().url().optional(),
})

export type TypedObjectLink = z.infer<typeof typedObjectLinkZ>

export default function MarkLink(props: PortableTextMarkComponentProps<TypedObjectLink>) {
  const {value, children} = props
  const {href} = value ?? {}

  if (!href) {
    return <>{children}</>
  }

  // Turn absolute links into relative links
  const linkUrl = new URL(href)

  if (linkUrl.host === `www.simeongriggs.dev` && !linkUrl.pathname.startsWith(`/resource`)) {
    return <Link to={linkUrl.pathname + linkUrl.search}>{children}</Link>
  }

  return <a href={href}>{children}</a>
}
