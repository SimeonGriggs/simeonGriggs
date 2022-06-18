import type {LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import React from 'react'
import {talksIndexQuery} from '~/lib/sanity/queries'
import {getClient} from '~/lib/sanity/getClient'

import HomeTitle from '~/components/HomeTitle'
import {ExtendedImageAsset, TalkDocument} from '~/lib/sanity/types'
import Talk from '~/components/Talk'
import TypeImage from '~/components/PortableText/TypeImage'

export const handle = `talk-index`

export const loader: LoaderFunction = async (props) => {
  const {request, params} = props

  // Put site in preview mode if the right query param is used
  const requestUrl = new URL(request.url)
  const preview = requestUrl.searchParams.get(`preview`) === process.env.SANITY_PREVIEW_SECRET

  const initialData = await getClient(preview).fetch(talksIndexQuery, params)

  if (!initialData || !Object.entries(initialData).length) {
    throw new Response(`Not Found`, {
      status: 404,
    })
  }

  return {
    initialData,
    preview,
    query: preview ? talksIndexQuery : ``,
    params: preview ? params : {},
  }
}

export default function TalksIndex() {
  const {initialData} = useLoaderData()
  const {talks, profilePhotos} = initialData

  return (
    <>
      <section className="col-span-6 mt-48 md:col-span-6 md:col-start-6 md:mt-0 lg:col-span-8 lg:col-start-8">
        <div className="py-12 md:py-24 lg:py-48">
          <HomeTitle wave title="Simeon can talk" />
        </div>
      </section>
      <section className="col-span-6 md:col-span-6 md:col-start-6 md:row-start-2 lg:col-span-8 lg:col-start-8">
        <div className="grid grid-cols-1 gap-y-12 pb-12 md:gap-y-24 md:pb-48">
          {talks?.length > 0
            ? talks.map((talk: TalkDocument) => <Talk key={talk._id} {...talk} />)
            : null}
        </div>
      </section>
      <section className="col-span-6 md:col-span-3 md:col-start-2 md:row-start-2 lg:col-span-5 lg:col-start-2">
        <div className="grid grid-cols-1 gap-y-12 md:gap-y-24 md:pb-48">
          {profilePhotos?.length > 0
            ? profilePhotos.map((photo: ExtendedImageAsset) => (
                <div key={photo._id}>
                  <p>
                    {photo.url ? (
                      <a href={`${photo.url}?dl=1`} title="Click to Download">
                        <TypeImage value={photo} />
                      </a>
                    ) : (
                      <TypeImage value={photo} />
                    )}
                  </p>

                  {photo?.asset?.description ? (
                    <p className="mt-4 px-4 text-center text-xs">{photo.asset.description}</p>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </section>
    </>
  )
}
