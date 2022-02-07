import React from 'react'

import Button from '~/components/Button'

interface TypeButtonProps {
  value: {
    link: {
      link?: string
      text: string
    }
  }
}

export default function TypeButton(props: TypeButtonProps) {
  const {value} = props

  if (!value) return null

  const {link, text} = value?.link ?? {}

  if (!text) return null

  if (!link) {
    return <>{text ?? ``}</>
  }

  return <Button href={link}>{text}</Button>
}
