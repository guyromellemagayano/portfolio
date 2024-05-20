import { forwardRef, memo } from 'react'

import {
  Article,
  type ArticleProps,
  type ArticleRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, formatDate } from '@guy-romelle-magayano/react-utils'

import { Card } from '@guy-romelle-magayano/portfolio/components'
import { type ArticlesData } from '@guy-romelle-magayano/portfolio/types'

export type ArticleCardsListRef = ArticleRef
export type ArticleCardsListProps = ArticleProps &
  Pick<ArticlesData, 'date' | 'slug' | 'title' | 'description' | 'category'>

const strings = {
  read: 'Read article'
}

/**
 * Renders the articles cards list component.
 * @param {ArticleCardsListProps} props - The props of the articles cards list.
 * @param {ArticleCardsListRef} ref - The reference of the articles cards list.
 * @returns The rendered articles cards list component.
 */
const ArticleCardsList = memo(
  forwardRef<ArticleCardsListRef, ArticleCardsListProps>(
    ({ date, slug, title, description, className, ...rest }, ref) => {
      const href = `/articles/${slug}`

      return (
        <Article
          {...rest}
          ref={ref}
          className={cn('md:grid md:grid-cols-4 md:items-baseline', className)}
        >
          {date && date?.length > 0 && (
            <Card.Eyebrow
              as="time"
              className="mt-1 hidden text-zinc-400 md:block dark:text-zinc-500"
            >
              {formatDate(date)}
            </Card.Eyebrow>
          )}

          <Card className="md:col-span-3">
            {href && href?.length > 0 && title && title?.length > 0 && (
              <Card.Title href={href}>{title}</Card.Title>
            )}

            {description && description?.length > 0 && (
              <Card.Description>{description}</Card.Description>
            )}

            {href && href?.length > 0 && <Card.Cta>{strings.read}</Card.Cta>}
          </Card>
        </Article>
      )
    }
  )
)

ArticleCardsList.displayName = 'ArticleCardsList'

export default ArticleCardsList
