import React from 'react'
import {LocationMarkerIcon} from '@heroicons/react/solid'

import Label from './Label'

function dateDisplay(dateString: string) {
  return dateString.split('T')[0]
}

type PublishedProps = {
  updated?: string
  location?: string
  published: string
}

export default function Published(props: PublishedProps) {
  const {updated, location, published} = props

  return (
    <Label>
      <span className="flex flex-col md:flex-row md:items-center">
        {updated ? (
          <span>
            Updated {dateDisplay(updated)}{' '}
            <span className="opacity-50">| Published {dateDisplay(published)}</span>
          </span>
        ) : (
          <span>{dateDisplay(published)}</span>
        )}

        {location ? (
          <span className="ml-auto inline-flex items-center gap-2">
            <LocationMarkerIcon className="w-6" />
            {location}
          </span>
        ) : null}
      </span>
    </Label>
  )
}
