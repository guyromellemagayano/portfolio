'use client'

import { forwardRef } from 'react'

import { formatDate } from '@guy-romelle-magayano/react-utils'

import {
  Card,
  type CardProps,
  type CardRef
} from '@guy-romelle-magayano/portfolio/components'
import { type ArticlesData } from '@guy-romelle-magayano/portfolio/types'

export type ArticleRef = CardRef
export type ArticleProps = CardProps & ArticlesData

const strings = {
  read: 'Read article'
}

/**
 * Renders the article component.
 * @param {ArticleProps} props - The props of the article.
 * @param {ArticleRef} ref - The reference of the article.
 * @returns The rendered article component.
 */
const Article = forwardRef<ArticleRef, ArticleProps>((props, ref) => {
  const { slug, title, date, description, ...rest } = props,
    href = `/articles/${slug}`

  return (
    <Card ref={ref} {...rest} as="article">
      {date && date?.length > 0 && (
        <Card.Eyebrow
          as="time"
          className="mb-2 text-zinc-400 dark:text-zinc-500"
          dateTime={date}
          decorate
        >
          {formatDate(date)}
        </Card.Eyebrow>
      )}

      {title && title?.length > 0 && href && href?.length > 0 && (
        <Card.Title href={href}>{title}</Card.Title>
      )}

      {description && description?.length > 0 && (
        <Card.Description>{description}</Card.Description>
      )}

      {href && href?.length > 0 && <Card.Cta>{strings.read}</Card.Cta>}
    </Card>
  )
})

Article.displayName = 'Article'

export default Article
