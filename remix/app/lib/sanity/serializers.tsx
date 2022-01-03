/* eslint-disable react/display-name */
import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import getYouTubeID from 'get-youtube-id'

import {PlayIcon} from '@heroicons/react/solid'
import {BlockItem} from './types'
import {urlFor} from '~/lib/sanity/helpers'
import Button from '~/components/Button'
import Prism from '~/components/Prism'
import CommentableBlock from '~/components/Comments/CommentableBlock'
import ProseHeader from '~/components/ProseHeader'

const BlockRenderer = (props: BlockItem) => {
  const {style = `normal`} = props.node
  // console.log(props.node)

  // Eliminate empty blocks
  const text = props?.node?.children.map((child: any) => child.text).join('')

  if (!text) return null

  // Add `id` attribute to headings
  if (/^h\d/.test(style)) {
    // return React.createElement(style, {id: scrollableKey(props.node._key)}, props.children)
    return <ProseHeader {...props} />
  }

  // Prism code highlighting
  if ([`code`, `pre`].includes(style)) {
    return text ? <Prism code={text} /> : null
  }

  // Fancy commenting block on paragraphs
  if ([`normal`].includes(style)) {
    return <CommentableBlock {...props} />
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

export const serializers = (comments: boolean) => ({
  container: ({children}: {children: any}) => children,
  types: {
    block: (props: any) =>
      comments ? BlockRenderer(props) : BlockContent.defaultSerializers.types.block(props),
    video: ({node}: {node: BlockVideo}) => {
      if (!node?.url) {
        return null
      }

      const id = getYouTubeID(node.url)

      return (
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="-mx-4 block aspect-w-16 aspect-h-9 relative group"
        >
          <div className="absolute z-10 inset-0 flex items-center justify-center text-white bg-blue-500/50 group-hover:bg-blue-500/20 transition-colors duration-100">
            <PlayIcon className="w-1/6 h-auto group-hover:scale-125 transition-transform duration-100" />
          </div>
          {node?.title ? (
            <div className="absolute z-10 inset-0 p-4">
              <span className="text-xl md:text-2xl font-black text-white">{node.title}</span>
            </div>
          ) : null}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
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
          src={urlFor(node.asset).width(800).toString()}
          alt={node?.asset?.altText}
          className="w-full h-auto"
        />
      </p>
    ),
    code: ({node}: {node: BlockCode}) =>
      node?.code ? <Prism code={node.code} language={node?.language} /> : null,
    codeSandbox: ({node}: {node: BlockVideo}) => {
      return node?.url ? (
        <iframe
          loading="lazy"
          src={node.url}
          className="w-full h-[400px] border-0 rounded overflow-hidden"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      ) : null
    },
    button: ({node}: {node: BlockButton}) => (
      <Button href={node.link.link}>{node.link.text}</Button>
    ),
  },
})
