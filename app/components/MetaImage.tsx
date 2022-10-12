import {urlFor} from '~/lib/sanity/helpers'
import type {ArticleDocument} from '~/lib/sanity/types'

export default function MetaImage({article}: {article: ArticleDocument}) {
  const {image, title, published, updated} = article

  return (
    <article
      className="absolute inset-0 z-50 mx-auto flex overflow-hidden"
      style={{maxWidth: 1200, maxHeight: 630}}
    >
      {image ? (
        <img
          src={urlFor(image).height(630).width(400).dpr(2).toString()}
          alt=""
          className="object-cover"
          height={630}
          width={400}
        />
      ) : null}
      <div className="flex h-full w-full items-center">
        <div className="flex h-full w-full flex-col">
          <header className="block w-full origin-top-left p-12 pr-24">
            {title ? (
              <h1 className="mb-8 text-7xl font-black leading-tight tracking-tighter text-blue-500">
                {title}
              </h1>
            ) : null}
          </header>

          <section className="mb-0 mt-auto flex w-full items-center justify-between bg-blue-500 p-12 leading-none text-white">
            {published && !updated ? (
              <span className="flex-shrink-0 font-mono text-2xl">{published}</span>
            ) : null}
            {updated ? (
              <span className="flex-shrink-0 font-mono text-2xl">Updated: {updated}</span>
            ) : null}
            <span className="text-2xl font-black">simeonGriggs.dev</span>
          </section>
        </div>
      </div>
    </article>
  )
}
