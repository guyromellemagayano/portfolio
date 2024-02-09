'use client'

import { ReactNode } from 'react'

import ContentLayout from '@/components/layouts/Content'
import ArticlesList from '@/components/list/Articles'

import { TArticlesData } from '@/data/articles'

type TArticlesApp = (data: TArticlesData) => ReactNode

/**
 * Renders the articles page.
 * @param data The articles page data.
 * @returns The articles page component.
 */
const ArticlesApp: TArticlesApp = (data) => {
  const heading = data?.hero?.heading || '',
        description = data?.hero?.description || []

  return (
    <ContentLayout
      id="hero"
      title={heading}
      intro={description}
      className="mt-16 sm:mt-32"
    >
      <ArticlesList>
        {/* {articles?.map(article => (
          <ArticlesListCards key={article.slug} {...article} />
        ))} */}
      </ArticlesList>
    </ContentLayout>
  )
}

export default ArticlesApp
