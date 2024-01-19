'use client'

import ContentLayout from '@/components/layouts/Content'
import ArticlesList from '@/components/list/Articles'

import { TArticlesData } from '@/data/articles'

/**
 * Renders the articles page.
 * @returns The articles page component.
 */
const ArticlesApp = (data: TArticlesData): JSX.Element => {
  const heading = data?.hero?.heading || ''
  const description = data?.hero?.description || []

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
