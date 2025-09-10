import {PortableText} from '@portabletext/react'
import dayjs from 'dayjs'
import {NavLink, useLoaderData} from 'react-router'

import type {Route} from './+types/home'

import {Container} from '~/components/container'
import {Heading, Lead, Subheading} from '~/components/text'
import {components} from '~/sanity/components'
import {image} from '~/sanity/image'
import {client} from '~/sanity/client'
import {HOME_QUERY} from '~/sanity/queries'
import clsx from 'clsx'

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Prompt Playbook'},
    {
      name: 'description',
      content: `What it takes to get better responses from AI, and how what you already know works perfectly with what's new.`,
    },
  ]
}

export async function loader() {
  return {
    data: await client.fetch(HOME_QUERY),
  }
}

export default function Home() {
  const {data} = useLoaderData<typeof loader>()

  return (
    <Container>
      <Subheading className="mt-16">
        {dayjs(data.publishedAt).format('dddd, D MMMM YYYY')}
      </Subheading>
      <Heading as="h1" className="mt-2">
        {data.title}
      </Heading>
      <PortableText
        value={data.summary}
        components={{
          block: {
            normal: ({children}) => (
              <Lead className="mt-6 max-w-3xl">{children}</Lead>
            ),
          },
        }}
      />

      <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
        <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
          <div className="flex items-center gap-3">
            <img
              alt=""
              src="https://pbs.twimg.com/profile_images/1900560347259338754/l7FMpDyH_400x400.jpg"
              className="aspect-square size-6 rounded-full object-cover"
            />
            <div className="text-sm/5 text-gray-700">
              <a href="https://www.simeongriggs.dev" target="_blank">
                Simeon Griggs
              </a>
            </div>
          </div>
        </div>

        <div className="text-gray-700">
          <div className="max-w-2xl xl:mx-auto">
            {data.mainImage && (
              <img
                alt={data.mainImage.alt || ''}
                src={image(data.mainImage).size(2016, 1344).url()}
                className="mb-10 aspect-3/2 w-full rounded-2xl object-cover shadow-xl"
              />
            )}
            {data.content && (
              <PortableText value={data.content} components={components} />
            )}
            {/* <div className="mt-10">
              <Button variant="outline" href="/">
                <ChevronLeftIcon className="size-4" />
                Back to index
              </Button>
            </div> */}
          </div>
        </div>

        <ul className="flex flex-col">
          {data._playbooks.map((playbook: any) => {
            let link

            if (playbook.visibility === 'home') {
              link = `/`
            } else if (
              playbook.slug?.current &&
              playbook.visibility !== 'coming-soon'
            ) {
              link = `/playbooks/${playbook.slug.current}`
            }

            return (
              <li
                key={playbook._id}
                className={clsx(
                  'pb-2 mb-2 border-b border-gray-100 border-dashed text-balance',
                  playbook.visibility === 'coming-soon' &&
                    'opacity-50 pointer-events-none',
                )}
              >
                <Subheading>
                  {link ? (
                    <NavLink
                      prefetch="intent"
                      className={({isActive}) =>
                        clsx(
                          'inline-block hover:text-[#b060ff] transition-colors duration-100',
                          isActive && 'text-[#b060ff]',
                        )
                      }
                      to={link}
                    >
                      {playbook.title}
                    </NavLink>
                  ) : (
                    <>{playbook.title}</>
                  )}
                </Subheading>
              </li>
            )
          })}
        </ul>
      </div>
    </Container>
  )
}
