'use client'

import { ReactNode, forwardRef } from 'react'

import { formatDate } from '@guy-romelle-magayano/react-utils'

import {
  Card,
  CardProps,
  CardRef
} from '@guy-romelle-magayano/portfolio/components/card'
import { ArticlesData } from '@guy-romelle-magayano/portfolio/types/data'

export type ArticleRef = CardRef
export type ArticleProps = CardProps & ArticlesData

const strings = {
  read: 'Read article'
}

/**
 * Renders the article component.
 * @param slug - The slug of the article.
 * @param title - The title of the article.
 * @param date - The date of the article.
 * @param description - The description of the article.
 * @param rest - The rest of the article props.
 * @returns The rendered article component.
 */
const Article = forwardRef<ArticleRef, ArticleProps>(
  ({ slug, title, date, description, ...rest }, ref): ReactNode => {
    const href = `/articles/${slug}`

    return (
      (href || date || title || description) && (
        <Card ref={ref} {...rest} as="article">
          {date && (
            <Card.Eyebrow
              as="time"
              className="mb-2 text-zinc-400 dark:text-zinc-500"
              dateTime={date}
              decorate
            >
              {formatDate(date)}
            </Card.Eyebrow>
          )}

          {title && href && <Card.Title href={href}>{title}</Card.Title>}

          {description && <Card.Description>{description}</Card.Description>}

          {href && <Card.Cta>{strings.read}</Card.Cta>}
        </Card>
      )
    )
  }
)

Article.displayName = 'Article'

export default Article
