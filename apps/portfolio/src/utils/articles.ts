'use server'

import { glob } from 'fast-glob'
import * as path from 'path'

import { type ArticlesData } from '@guy-romelle-magayano/portfolio/types'

/**
 * Imports the article data.
 * @returns The article data.
 */
export const importArticle = async (
  fileName: string
): Promise<any | undefined> => {
  const { meta, default: component } = await import(
    `@guy-romelle-magayano/portfolio/app/blog/${fileName}`
  )

  return { slug: fileName.replace(/(\/page)?\.mdx$/, ''), ...meta, component }
}

/**
 * Fetches the articles data.
 * @returns The articles data.
 */
export const articlesData = async (): Promise<
  Array<ArticlesData> | undefined
> =>
  await Promise.all(
    await glob(['**/*.mdx'], {
      cwd: path.join(process.cwd(), '/src/app/articles')
    })
      .then(res => res.map(importArticle))
      .catch(() => [])
  )
    .then(res => res.sort((a, z) => +new Date(z.date) - +new Date(a.date)))
    .catch(() => [])

/**
 * Retrieves the articles data by category.
 * @returns The articles data by category.
 */
export const articlesByCategory = async (
  data: Array<ArticlesData> | undefined,
  category: string
): Promise<Array<ArticlesData> | undefined> =>
  (data &&
    data?.length > 0 &&
    data.filter(article => article.category === category)) ||
  undefined
