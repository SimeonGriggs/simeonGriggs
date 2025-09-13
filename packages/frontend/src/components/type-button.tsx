import type {PortableTextTypeComponentProps} from '@portabletext/react'
import React from 'react'

import {Button} from './button'

type Slug = {
  current: string
}

type ButtonValue = {
  _type: 'button'
  _key?: string
  link: {
    link?: string | null
    text?: string | null
    reference?: {
      slug: Slug
    } | null
  } | null
}

export function TypeButton(props: PortableTextTypeComponentProps<ButtonValue>) {
  const value = React.useMemo(() => {
    if (!props.value || props.value._type !== 'button') {
      return null
    }
    return props.value as ButtonValue
  }, [props.value])

  if (!value) return null

  const {link, text, reference} = value?.link ?? {}

  if (!text) {
    return null
  } else if (reference?.slug?.current) {
    return (
      <p className="text-center">
        <Button to={`/${reference.slug.current}`}>{text}</Button>
      </p>
    )
  } else if (link) {
    return (
      <p className="text-center">
        <Button href={link}>{text}</Button>
      </p>
    )
  } else {
    return <p>{text}</p>
  }
}
