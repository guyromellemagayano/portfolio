'use client'

import { ArticlesList, ArticlesListCards } from '@components/List'
import { SimpleLayout } from '@components/layouts'
import { TBaseCommonAppComponentProps } from 'types/common'

/**
 * Renders the articles page.
 * @param translations - The translations to use.
 * @param articles - The articles to display.
 * @returns The articles page component.
 */
export default function ArticlesApp({
  translations,
  articles,
  ...props
}: TBaseCommonAppComponentProps): JSX.Element {
  return (
    <SimpleLayout
      id="hero"
      title={props?.hero?.heading || ''}
      intro={props?.hero?.description || []}
    >
      <ArticlesList>
        {articles?.map(article => (
          <ArticlesListCards key={article.slug} {...article} />
        ))}
      </ArticlesList>
    </SimpleLayout>
  )
}
