'use client'

import { Card } from '@/components'

import { formatDate } from '@/lib'

import { TArticleProps } from '@/types/components'

/**
 * Renders an article card with title, date, description, and a CTA to read the full article.
 * @param {String} slug - The article slug.
 * @param {Object} meta - The article metadata.
 * @returns {JSX.Element} The rendered component.
 */
const Article = ({
  slug,
  title,
  date,
  description
}: TArticleProps): JSX.Element => {
  const dateNow = new Date()
  const dateNowToString = dateNow.toISOString()

  return (
    <Card as="article">
      <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
      <Card.Eyebrow
        as="time"
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

export default Article
