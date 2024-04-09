'use client'

import { ContentLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Content'
import { ArticleCardsList } from '@guy-romelle-magayano/portfolio/components/Lists/ArticleCards'
import { ArticlesList } from '@guy-romelle-magayano/portfolio/components/Lists/Articles'
import {
  ArticlesData,
  ArticlesPageData
} from '@guy-romelle-magayano/portfolio/types'

export type ArticlesAppProps = ArticlesPageData & {
  articles?: Array<ArticlesData>
}

/**
 * Render the articles application component.
 * @param props - The props of the articles application.
 * @returns The rendered articles application component.
 */
const ArticlesApp = (props: ArticlesAppProps) => {
  const { hero, articles } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    <ContentLayout.Simple title={heading} intro={description}>
      <ArticlesList>
        {articles?.map((article, index) => (
          <ArticleCardsList key={index} {...article} />
        ))}
      </ArticlesList>
    </ContentLayout.Simple>
  )
}

export default ArticlesApp
