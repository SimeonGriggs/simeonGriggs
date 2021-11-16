import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {LogoutIcon} from '@heroicons/react/solid'

import {useMatches} from 'remix'
import {usePreviewSubscription} from '~/lib/sanity/usePreviewSubscription'

export default function Preview({data, setData}: {data: any; setData: any}) {
  const {pathname} = useLocation()
  const matches = useMatches()
  const {query, params} = matches.find((match) => match.handle === 'article')?.data ?? {}

  const {data: previewData} = usePreviewSubscription(query, {
    params,
    initialData: data,
    enabled: true,
  })

  useEffect(() => setData(previewData), [previewData])

  return (
    <div className="fixed inset-0 flex justify-end md:justify-start items-end p-6 pointer-events-none z-50">
      <div className="bg-pink-500 text-white p-1 font-bold rounded shadow-lg flex items-center gap-x-2">
        <span className="inline-block p-2">Preview Mode</span>
        <a
          href={pathname}
          className="flex p-2 px-3 items-center gap-x-1 hover:bg-pink-600 rounded pointer-events-auto"
        >
          <LogoutIcon className="w-4 h-auto" /> Exit
        </a>
      </div>
    </div>
  )
}
