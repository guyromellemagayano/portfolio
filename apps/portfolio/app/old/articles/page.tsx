import { ArticlesApp } from '@components/app/articles'
import ArticlesData from '@data/articles'
import { getAllArticles } from '@lib/articles'
import { Metadata } from 'next'

const { meta, ...rest } = ArticlesData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders the projects page
 * @param locale - The locale to use.
 * @returns The articles page component
 */
export default async function ArticlesPage({
  params: { locale }
}): Promise<JSX.Element> {
  const articles = await getAllArticles()
  const translations = {}

  return (
    <ArticlesApp translations={translations} articles={articles} {...rest} />
  )
}
