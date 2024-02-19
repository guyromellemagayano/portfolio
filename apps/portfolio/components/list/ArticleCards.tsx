'use client'

import { FC, useId } from 'react'

import type { TArticleProps } from '@/components/Article'
import Card from '@/components/Card'

import { isEmpty, isStringType } from '@/utils/checkTypes'
import { formatDate } from '@/utils/formatDate'

/**
 * Renders the articles cards list component.
 * @param date - The date of the article.
 * @param slug - The slug of the article.
 * @param title - The title of the article.
 * @param description - The description of the article.
 * @param id - The additional ID for the component.
 * @param rest - The rest of the props.
 * @returns The rendered articles cards list component.
 */
const ArticlesCardsList: FC<TArticleProps> = ({
  date,
  slug,
  title,
  description,
  id,
  ...rest
}) => {
  const customId = useId()

  return (
    <article
      id={id || customId}
      className="md:grid md:grid-cols-4 md:items-baseline"
      {...rest}
    >
      {isStringType(date) && !isEmpty(date) && (
        <Card.Eyebrow
          as="time"
          className="mt-1 hidden md:block text-zinc-400 dark:text-zinc-500"
        >
          {formatDate(date)}
        </Card.Eyebrow>
      )}

      <Card className="md:col-span-3">
        {isStringType(slug) &&
          !isEmpty(slug) &&
          isStringType(title) &&
          !isEmpty(title) && (
            <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
          )}

        {isStringType(description) && !isEmpty(description) && (
          <Card.Description>{description}</Card.Description>
        )}

        <Card.Cta>Read article</Card.Cta>
      </Card>
    </article>
  )
}

export default ArticlesCardsList
