'use client'

import {
  ArticleCardsList,
  ArticlesList,
  ContentLayout
} from '@guy-romelle-magayano/portfolio/components'
import {
  type ArticlesData,
  type ArticlesPageData
} from '@guy-romelle-magayano/portfolio/types'

export type ArticlesAppProps = ArticlesPageData & {
  articles?: Array<ArticlesData>
}

/**
 * Render the articles application component.
 * @param {ArticlesAppProps} props - The props of the articles application.
 * @returns The rendered articles application component.
 */
const ArticlesApp = (props: ArticlesAppProps) => {
  const { hero, articles } = props,
    heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    heading &&
    heading?.length > 0 &&
    description &&
    ((typeof description === 'string' && description?.length > 0) ||
      (Array.isArray(description) && description?.length > 0)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {articles && Array.isArray(articles) && articles?.length > 0 && (
          <ArticlesList>
            {articles.map((article, index) => (
              <ArticleCardsList key={index} {...article} />
            ))}
          </ArticlesList>
        )}
      </ContentLayout.Simple>
    )
  )
}

ArticlesApp.displayName = 'ArticlesApp'

export default ArticlesApp
