import { forwardRef, memo } from 'react'

import {
  Article,
  type TArticleProps,
  type TArticleRef
} from '@react-components'

import { cn, formatDate } from '@react-utils'

import { Card } from '@portfolio/components'
import { type TArticlesData } from '@portfolio/types'

export type ArticleCardsListRef = TArticleRef
export type ArticleCardsListProps = TArticleProps &
  Pick<TArticlesData, 'date' | 'slug' | 'title' | 'description' | 'category'>

const strings = {
  read: 'Read article'
}

/**
 * Renders the articles cards list component.
 * @param {ArticleCardsListProps} props - The component props
 * @param {ArticleCardsListRef} ref - The component reference
 * @returns The rendered articles cards list component
 */
const ArticleCardsList = memo(
  forwardRef<ArticleCardsListRef, ArticleCardsListProps>(
    ({ date, slug, title, description, className, ...rest }, ref) => {
      const href = `/articles/${slug}`

      if (!date || !slug || !description || !title) return null

      return (
        <Article
          ref={ref}
          className={cn('md:grid md:grid-cols-4 md:items-baseline', className)}
          {...rest}
        >
          {date && (
            <Card.Eyebrow
              as="time"
              className={cn(
                'mt-1 hidden text-zinc-400 md:block dark:text-zinc-500'
              )}
            >
              {formatDate(date)}
            </Card.Eyebrow>
          )}

          <Card className={cn('md:col-span-3')}>
            {slug && title && <Card.Title href={href}>{title}</Card.Title>}
            {description && <Card.Description>{description}</Card.Description>}
            {slug && <Card.Cta>{strings.read}</Card.Cta>}
          </Card>
        </Article>
      )
    }
  )
)

ArticleCardsList.displayName = 'ArticleCardsList'

export default ArticleCardsList
