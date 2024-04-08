import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  ArticleProps,
  ArticleRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, formatDate } from '@guy-romelle-magayano/react-utils'

import { ArticlesData } from '@guy-romelle-magayano/portfolio/types'

// Dynamic imports
const Article = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Article
  )
)
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

export type ArticleCardsListRef = ArticleRef
export type ArticleCardsListProps = ArticleProps &
  Pick<ArticlesData, 'date' | 'slug' | 'title' | 'description'>

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
const ArticleCardsList = forwardRef<ArticleCardsListRef, ArticleCardsListProps>(
  ({ date, slug, title, description, className, ...rest }, ref) => {
    const href = `/articles/${slug}`

    return (
      date &&
      title &&
      description &&
      href && (
        <Article
          ref={ref}
          {...rest}
          className={cn('md:grid md:grid-cols-4 md:items-baseline', className)}
        >
          {date && (
            <CardEyebrow
              as="time"
              className="mt-1 hidden text-zinc-400 md:block dark:text-zinc-500"
            >
              {formatDate(date)}
            </CardEyebrow>
          )}

          {href && title && description && (
            <Card className="md:col-span-3">
              {title && href && <CardTitle href={href}>{title}</CardTitle>}

              {description && <CardDescription>{description}</CardDescription>}

              <CardCta>{strings.read}</CardCta>
            </Card>
          )}
        </Article>
      )
    )
  }
)

ArticleCardsList.displayName = 'ArticleCardsList'

export default ArticleCardsList
