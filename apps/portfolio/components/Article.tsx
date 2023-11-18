'use client'

import { formatDate } from '@lib/formatDate'
import { TArticleProps } from 'types/components'

import Card from './Card'

/**
 * Renders an article card with title, date, description, and a CTA to read the full article.
 * @param {String} slug - The article slug.
 * @param {Object} meta - The article metadata.
 * @returns {JSX.Element} The rendered component.
 */
export default function Article({
  slug,
  title,
  date,
  description
}: TArticleProps): JSX.Element {
  const dateNow = new Date()
  const dateNowToString = dateNow.toISOString()

  return (
    <Card as="article">
      <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
      <Card.Eyebrow
        as="time"
        dateTime={date}
        className="text-zinc-400 dark:text-zinc-500"
        decorate
      >
        {formatDate(date || dateNowToString)}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}
