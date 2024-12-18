import type {ArticleStub, ExchangeStub} from '~/types/stubs'

export function sortArticles(allArticles: (ArticleStub | ExchangeStub)[]) {
  let sortedArticles = allArticles
    .flat()
    .filter((a) => a.published)
    .sort((a, b) =>
      a.published && b.published
        ? new Date(b.published).getTime() - new Date(a.published).getTime()
        : 0,
    )

  // If a `blog` post isn't the first one, move it to the top
  const firstBlogPostIndex = sortedArticles.findIndex((article) => article.source === `blog`)
  if (firstBlogPostIndex !== 0) {
    const firstBlogPost = sortedArticles[firstBlogPostIndex]
    sortedArticles.splice(firstBlogPostIndex, 1)
    sortedArticles.unshift(firstBlogPost)
  }

  return sortedArticles
}
