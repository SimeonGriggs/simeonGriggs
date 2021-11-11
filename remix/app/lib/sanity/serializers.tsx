/* eslint-disable react/display-name */
import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import getYouTubeID from 'get-youtube-id'

// import {urlFor} from './client'
import Button from '~/components/Button'
import Prism from '~/components/Prism'

const BlockRenderer = (props: any) => {
  const {style = 'normal'} = props.node

  if (/^h\d/.test(style)) {
    return React.createElement(style, {id: props.node._key}, props.children)
  }

  if (['code', 'pre'].includes(style)) {
    const text = props?.node?.children.map((child: any) => child.text).join('')
    return text ? <Prism code={text} /> : null
  }

  return BlockContent.defaultSerializers.types.block(props)
}

interface BlockVideo {
  url: string
  title?: string
}

interface BlockImage {
  asset: {
    altText: string
  }
}

interface BlockCode {
  code: string
  language?: string
}

interface BlockButton {
  link: {
    link?: string
    text: string
  }
}

export const serializers = {
  container: ({children}: {children: any}) => children,
  types: {
    block: BlockRenderer,
    video: ({node}: {node: BlockVideo}) => {
      const id = getYouTubeID(node.url)

      return (
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="-mx-4 block aspect-w-16 aspect-h-9"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            loading="lazy"
            alt={node?.title ?? ``}
            className="w-full h-full object-cover"
          />
        </a>
      )
    },
    break: () => <hr />,
    image: ({node}: {node: BlockImage}) => (
      <p className="-mx-4 border-t border-b md:border border-gray-100">
        <img
          loading="lazy"
          // src={urlFor(node.asset).width(800).toString()}
          alt={node?.asset?.altText}
          className="w-full h-auto"
        />
      </p>
    ),
    code: ({node}: {node: BlockCode}) =>
      node?.code ? <Prism code={node.code} language={node?.language} /> : null,
    button: ({node}: {node: BlockButton}) => (
      <Button href={node.link.link}>{node.link.text}</Button>
    ),
  },
}
