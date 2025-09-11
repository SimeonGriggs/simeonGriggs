import {MapPinIcon} from '@heroicons/react/24/solid'
import React from 'react'

import Label, {type LabelTones} from './Label'

function dateDisplay(dateString: string) {
  return dateString.split('T')[0]
}

type PublishedProps = {
  published: string
  updated?: string
  location?: string
  tone?: LabelTones
}

export default function Published({
  updated,
  location,
  published,
  tone,
}: PublishedProps) {
  return (
    <Label tone={tone}>
      <span className="flex flex-col md:flex-row md:items-center">
        {updated ? (
          <span>
            <time dateTime={published}>{dateDisplay(published)}</time>
            {` `}•{` `}
            <time dateTime={updated}>Updated {dateDisplay(updated)}</time>
          </span>
        ) : (
          <time dateTime={published}>{dateDisplay(published)}</time>
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
