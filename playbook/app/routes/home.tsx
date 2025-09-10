import {client} from '~/sanity/client'
import {HOME_QUERY} from '~/sanity/queries'
import {PortableText} from '@portabletext/react'

import {useLoaderData} from 'react-router'
import type {Route} from './+types/home'
import {components, componentsSummary} from '~/sanity/components'
import {Container} from '~/components/Container'

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Prompt Playbook'},
    {
      name: 'description',
      content: `Follow along as I share what I've learned about improved prompt engineering and AI`,
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
      <header className="pt-16 sm:pt-32">
        <div className="font-mono uppercase text-blue-800 mb-8 block">
          Prompt Playbook
        </div>
        <h1 className="text-6xl text-pretty max-w-3xl font-black tracking-tight text-blue-500 sm:text-7xl dark:text-blue-50 before:content-['\201C'] after:content-['\201D'] relative before:absolute before:translate-x-[-115%] before:text-cyan-400 after:text-cyan-400 after:translate-x-[5%] after:absolute my-12">
          {data?.title}
        </h1>
        <div className="max-w-2xl">
          <PortableText value={data?.summary} components={componentsSummary} />
        </div>
      </header>
      <article className="max-w-2xl pb-16 sm:pb-32">
        <PortableText value={data?.content} components={components} />
      </article>
    </Container>
  )
}
