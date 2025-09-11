import type {PortableTextComponents} from '@portabletext/react'
import {image} from '../image'
import {TypeCode} from './types-code'
import {TypeGallery} from './types-gallery'
import {TypeTalks} from './types-talks'

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
  },
}
