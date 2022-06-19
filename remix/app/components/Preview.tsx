import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {LogoutIcon} from '@heroicons/react/solid'

import {useMatches} from '@remix-run/react'
import {usePreviewSubscription} from '~/lib/sanity/usePreviewSubscription'

export default function Preview({data, setData}: {data: any; setData: any}) {
  const {pathname} = useLocation()
  const matches = useMatches()
  const {query, params} = matches.find((match) => match.handle === 'article')?.data ?? {}

  const {data: previewData} = usePreviewSubscription(query, {
    params,
    initialData: data,
    // This component only renders when the preview is enabled
    enabled: true,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setData(previewData), [previewData])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-end p-6 md:justify-start">
      <div className="flex items-center gap-x-2 rounded bg-pink-500 p-1 font-bold text-white shadow-lg">
        <span className="inline-block p-2">Preview Mode</span>
        <a
          href={pathname}
          className="pointer-events-auto flex items-center gap-x-1 rounded p-2 px-3 hover:bg-pink-600"
        >
          <LogoutIcon className="h-auto w-4" /> Exit
        </a>
      </div>
    </div>
  )
}
