'use client'

import { ArticlesData } from '@/data'

import { ArticlesList, ContentLayout } from '@/components'

/**
 * Renders the articles page.
 * @returns The articles page component.
 */
const ArticlesApp = (): JSX.Element => {
  const { hero } = ArticlesData()

  return (
    <ContentLayout
      id="hero"
      title={hero?.heading || ''}
      intro={hero?.description || []}
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
