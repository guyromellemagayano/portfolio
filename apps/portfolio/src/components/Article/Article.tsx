import { ReactNode, forwardRef } from 'react'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { formatDate } from '@guy-romelle-magayano/react-utils'

import { Card } from '@guy-romelle-magayano/portfolio/components/Card'
import { ArticlesData } from '@guy-romelle-magayano/portfolio/types/data'

export type ArticleRef = DivisionRef
export type ArticleProps = DivisionProps & ArticlesData

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
    const dateNow = new Date(),
      dateNowToString = dateNow.toISOString(),
      strings = {
        read: 'Read article'
      }

    let href = `/articles/${slug}`,
      articleDate = date || dateNowToString

    return (
      <Card ref={ref} as="article" {...rest}>
        {articleDate && (
          <Card.Eyebrow
            as="time"
            className="mb-2 text-zinc-400 dark:text-zinc-500"
            dateTime={articleDate}
            decorate
          >
            {formatDate(articleDate)}
          </Card.Eyebrow>
        )}

        {title && <Card.Title href={href}>{title}</Card.Title>}

        {description && <Card.Description>{description}</Card.Description>}

        <Card.Cta>{strings.read}</Card.Cta>
      </Card>
    )
  }
)

Article.displayName = 'Article'

export default Article
