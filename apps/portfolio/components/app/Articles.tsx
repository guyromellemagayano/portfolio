'use client'

import { FC, useId } from 'react'

import ContentLayout from '@/components/layouts/Content'
import ArticlesList from '@/components/list/Articles'

import { TArticlesData } from '@/data/articles'

import type { TCommonComponentProps } from '@/types/common'

export type TArticlesAppDataProps = {
  data: TArticlesData
}

export type TArticlesAppProps = TCommonComponentProps & TArticlesAppDataProps

/**
 * Renders the articles page.
 * @param id The articles page id.
 * @param data The articles page data.
 * @param rest The articles page props.
 * @returns The articles page component.
 */
const ArticlesApp: FC<TArticlesAppProps> = ({ id, data, ...rest }) => {
  const customId = useId()

  return (
    <ContentLayout
      id={id || customId}
      title={data?.hero?.heading || ''}
      intro={data?.hero?.description || []}
      {...rest}
    >
      <ArticlesList className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        {/* {articles?.map(article => (
          <ArticlesListCards key={article.slug} {...article} />
        ))} */}
      </ArticlesList>
    </ContentLayout>
  )
}

export default ArticlesApp
