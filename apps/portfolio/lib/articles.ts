import glob from 'fast-glob'
import { TArticleLibProps, TArticleWithSlugLibProps } from 'types/libs'

async function importArticle(
  articleFilename: string
): Promise<TArticleWithSlugLibProps> {
  const { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: TArticleLibProps
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article
  }
}

export async function getAllArticles() {
  const articleFilenames = await glob('*/page.mdx', {
    cwd: './app/articles'
  })

  const articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
