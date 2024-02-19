'use client'

import { ReactNode } from 'react'

import Card from '@/components/Card'

import { formatDate } from '@/utils/formatDate'

import { TContainerProps } from '@/types/common'

export type TArticleProps = TContainerProps & {
  slug: string
  title: string
  date: string
  description: string
}

/**
 * Renders the article component.
 * @param slug - The slug of the article.
 * @param title - The title of the article.
 * @param date - The date of the article.
 * @param description - The description of the article.
 * @returns The rendered article component.
 */
const Article = ({
  slug,
  title,
  date,
  description
}: TArticleProps): ReactNode => {
  const dateNow = new Date(),
    dateNowToString = dateNow.toISOString()

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
