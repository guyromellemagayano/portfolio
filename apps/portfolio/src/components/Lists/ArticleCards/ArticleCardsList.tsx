import { forwardRef, memo } from 'react'

import {
  Article,
  type ArticleProps,
  type ArticleRef
} from '@guy-romelle-magayano/react-components/server'

import {
  cn,
  formatDate,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import { Card } from '@guy-romelle-magayano/portfolio/components/Card'
import { ArticlesData } from '@guy-romelle-magayano/portfolio/types'

export type ArticleCardsListRef = ArticleRef
export type ArticleCardsListProps = ArticleProps &
  Pick<ArticlesData, 'date' | 'slug' | 'title' | 'description' | 'category'>

const strings = {
  read: 'Read article'
}

/**
 * Renders the articles cards list component.
 * @param date - The date of the article.
 * @param slug - The slug of the article.
 * @param title - The title of the article.
 * @param description - The description of the article.
 * @param className - The class name of the articles cards list.
 * @param rest - The rest of the props.
 * @returns The rendered articles cards list component.
 */
const ArticleCardsList = memo(
  forwardRef<ArticleCardsListRef, ArticleCardsListProps>(
    ({ date, slug, title, description, className, ...rest }, ref) => {
      const href = `/articles/${slug}`

      return (
        !isEmpty(title) &&
        isStringType(title) &&
        !isEmpty(description) &&
        isStringType(description) &&
        !isEmpty(slug) &&
        isStringType(slug) && (
          <Article
            ref={ref}
            {...rest}
            className={cn(
              'md:grid md:grid-cols-4 md:items-baseline',
              className
            )}
          >
            {!isEmpty(date) && isStringType(date) && (
              <Card.Eyebrow
                as="time"
                className="mt-1 hidden text-zinc-400 md:block dark:text-zinc-500"
              >
                {formatDate(date)}
              </Card.Eyebrow>
            )}

            <Card className="md:col-span-3">
              <Card.Title href={href}>{title}</Card.Title>
              <Card.Description>{description}</Card.Description>
              <Card.Cta>{strings.read}</Card.Cta>
            </Card>
          </Article>
        )
      )
    }
  )
)

ArticleCardsList.displayName = 'ArticleCardsList'

export default ArticleCardsList
