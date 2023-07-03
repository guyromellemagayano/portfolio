/* eslint-disable @typescript-eslint/no-explicit-any */
import glob from 'fast-glob'
import * as path from 'path'

// This function is used to import a single article
const importArticle = async (
  articleFilename: string
): Promise<{
  slug: string
  meta: {
    author: string
    date: string
    slug: string
    description: string
    title: string
  }
  component: any
}> => {
  const { meta = {}, default: component } = await import(`../pages/articles/${articleFilename}`)

  // Provide default values for missing meta
  const { author = '', date = '', slug = '', description = '', title = '' } = meta;

  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    meta: { author, date, slug, description, title },
    component,
  }
}


// This function is used to import all articles
export const getAllArticles = async (): Promise<any[]> => {
  const articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  const articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => new Date(z.meta.date).valueOf() - new Date(a.meta.date).valueOf())
}
