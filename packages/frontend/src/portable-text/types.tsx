import type {PortableTextComponents} from '@portabletext/react'
import {image} from '../image'
import {TypeButton} from '../components/type-button'
import {TypeCodeSandbox} from '../components/codesandbox'
import TypeTldraw from '../components/tldraw'
import {TypeCode} from './types-code'
import {TypeGallery} from './types-gallery'
import {TypeTalks} from './types-talks'
import {TypeVideo} from './types-video'

export const typeComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({value}) => (
      <img
        alt={value.alt || ''}
        src={image(value).width(1000).url()}
        className="w-full rounded-2xl"
      />
    ),
    gallery: TypeGallery,
    talks: TypeTalks,
    break: ({value}) => {
      switch (value.style) {
        case 'space':
          return <div className="my-8" />
        default:
          return <hr className="my-8 border-t border-gray-200" />
      }
    },
    code: TypeCode,
    tldraw: TypeTldraw,
    codeSandbox: TypeCodeSandbox,
    button: TypeButton,
    video: TypeVideo,
  },
}
