import type {PortableTextMarkComponentProps} from '@portabletext/react'
import {Link} from '@remix-run/react'
import React from 'react'
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

  const linkUrl = new URL(href)

  if (linkUrl.host === `www.simeongriggs.dev`) {
    return <Link to={linkUrl.pathname}>{children}</Link>
  }

  return <a href={href}>{children}</a>
}
