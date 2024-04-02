import { glob } from 'fast-glob'
import * as path from 'path'

import { ArticlesData } from '@guy-romelle-magayano/portfolio/types/data'

export const importArticle = async (fileName: string) => {
  const { meta, default: component } = await import(
    `@guy-romelle-magayano/portfolio/app/articles/${fileName}`
  )

  return { slug: fileName.replace(/(\/page)?\.mdx$/, ''), ...meta, component }
}

export const articlesData = async (): Promise<Array<ArticlesData>> =>
  await Promise.all(
    await glob(['**/*.mdx'], {
      cwd: path.join(process.cwd(), '/src/app/articles')
    })
      .then(res => res.map(importArticle))
      .catch(() => [])
  )
    .then(res => res.sort((a, z) => +new Date(z.date) - +new Date(a.date)))
    .catch(() => [])

export const articlesByCategory = (
  data: Array<ArticlesData> | undefined,
  category: string
): Array<ArticlesData> | [] =>
  data?.filter(article => article.category === category) || []
