'use client'

import { forwardRef } from 'react'

import { formatDate } from '@react-utils'

import { Card, type CardRef } from '@portfolio/components'
import type { ArticlesData } from '@portfolio/types'

export type ArticleRef = CardRef
export type ArticleProps = ArticlesData

const strings = {
  read: 'Read article'
}

/**
 * Renders the article component.
 * @param {ArticleProps} props - The component props
 * @param {ArticleRef} ref - The component reference
 * @returns The rendered article component
 */
const Article = forwardRef<ArticleRef, ArticleProps>(
  ({ slug, title, date, description, ...rest }, ref) => {
    const href = `/articles/${slug}`

    return (
      <Card ref={ref} {...rest} as="article">
        {date?.length > 0 && (
          <Card.Eyebrow
            as="time"
            className="mb-2 text-zinc-400 dark:text-zinc-500"
            dateTime={date}
            decorate
          >
            {formatDate(date)}
          </Card.Eyebrow>
        )}

        {title?.length > 0 && slug?.length > 0 && (
          <Card.Title href={href}>{title}</Card.Title>
        )}

        {description?.length > 0 && (
          <Card.Description>{description}</Card.Description>
        )}

        {slug?.length > 0 && <Card.Cta>{strings.read}</Card.Cta>}
      </Card>
    )
  }
)

Article.displayName = 'Article'

export default Article
