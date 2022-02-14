import {urlFor} from '~/lib/sanity/helpers'
import {ArticleDocument} from '~/lib/sanity/types'

export default function MetaImage({article}: {article: ArticleDocument}) {
  const {image, title, published, updated} = article

  return (
    <article
      className="absolute inset-0 z-50 mx-auto flex overflow-hidden"
      style={{maxWidth: 1200, maxHeight: 630}}
    >
      {image ? (
        <img
          src={urlFor(image).height(630).width(400).toString()}
          alt=""
          className="object-cover"
          height={630}
          width={400}
        />
      ) : null}
      <div className="flex w-full h-full items-center">
        <div className="flex flex-col w-full h-full">
          <header className="p-12 w-2/3 scale-125 origin-top-left block">
            {title ? (
              <h1 className="leading-none font-black mb-8 tracking-tighter text-7xl text-blue-500">
                {title}
              </h1>
            ) : null}
          </header>

          <section className="bg-blue-500 w-full text-white p-12 mb-0 leading-none mt-auto flex justify-between items-center">
            {published && !updated ? (
              <span className="font-mono text-2xl flex-shrink-0">{published}</span>
            ) : null}
            {updated ? (
              <span className="font-mono text-2xl flex-shrink-0">Updated: {updated}</span>
            ) : null}
            <span className="font-black text-2xl">simeonGriggs.dev</span>
          </section>
        </div>
      </div>
    </article>
  )
}
