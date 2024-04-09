import { ReactNode, forwardRef } from 'react'

import dynamic from 'next/dynamic'

import { formatDate } from '@guy-romelle-magayano/react-utils'

import {
  CardProps,
  CardRef
} from '@guy-romelle-magayano/portfolio/components/Card'
import { ArticlesData } from '@guy-romelle-magayano/portfolio/types/data'

// Dynamic imports
const Card = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card
  )
)
const CardEyebrow = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Eyebrow
  )
)
const CardTitle = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Title
  )
)
const CardDescription = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Description
  )
)
const CardCta = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Cta
  )
)

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
            <CardEyebrow
              as="time"
              className="mb-2 text-zinc-400 dark:text-zinc-500"
              dateTime={date}
              decorate
            >
              {formatDate(date)}
            </CardEyebrow>
          )}

          {title && href && <CardTitle href={href}>{title}</CardTitle>}

          {description && <CardDescription>{description}</CardDescription>}

          {href && <CardCta>{strings.read}</CardCta>}
        </Card>
      )
    )
  }
)

Article.displayName = 'Article'

export default Article
