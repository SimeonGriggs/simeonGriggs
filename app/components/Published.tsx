import React from 'react'
import {MapPinIcon} from '@heroicons/react/24/solid'

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
            Updated {dateDisplay(updated)} <span>| Published {dateDisplay(published)}</span>
          </span>
        ) : (
          <span>{dateDisplay(published)}</span>
        )}

        {location ? (
          <span className="inline-flex items-center gap-2 md:ml-auto">
            {location}
            <MapPinIcon className="hidden w-6 md:block" />
          </span>
        ) : null}
      </span>
    </Label>
  )
}
