'use client'

import { forwardRef } from 'react'

import { cn, formatDate } from '@react-utils'

import { Card, CardProps, type CardRef } from '@portfolio/components'
import type { ArticlesData } from '@portfolio/types'

export type ArticleRef = CardRef
export type ArticleProps = CardProps & ArticlesData

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
    const href = `/blog/${slug}`

    return (
      <Card ref={ref} as="article" {...rest}>
        {date && (
          <Card.Eyebrow
            as="time"
            className={cn('mb-2 text-zinc-400 dark:text-zinc-500')}
            dateTime={date}
            decorate
          >
            {formatDate(date)}
          </Card.Eyebrow>
        )}
        {title && slug && <Card.Title href={href}>{title}</Card.Title>}
        {description && <Card.Description>{description}</Card.Description>}
        {slug && <Card.Cta>{strings.read}</Card.Cta>}
      </Card>
    )
  }
)

Article.displayName = 'Article'

export default Article
