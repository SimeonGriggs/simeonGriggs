import React from 'react'

import Label from './Label'

function dateDisplay(dateString: string) {
  return dateString.split('T')[0]
}

export default function Published({updated, published}: {updated?: string; published: string}) {
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
      </span>
    </Label>
  )
}
