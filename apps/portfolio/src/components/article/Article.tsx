/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, memo } from 'react'

import { cn, formatDate } from '@react-utils'

import { Card, CardProps, type CardRef } from '@portfolio/components'

export type TArticleRef = CardRef
export type TArticleProps = CardProps & any

const strings = {
  read: 'Read article'
}

/**
 * Renders the article component.
 * @param {TArticleProps} props - The component props
 * @param {TArticleRef} ref - The component reference
 * @returns The rendered article component
 */
const Article = memo(
  forwardRef<TArticleRef, TArticleProps>(
    ({ slug, title, date, description, ...rest }, ref) => {
      if (!slug && !title && !date && !description) return null

      const href = `/articles/${slug}`

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
)

Article.displayName = 'Article'

export default Article
