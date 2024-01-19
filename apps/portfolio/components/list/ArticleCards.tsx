'use client'

import type { TArticleProps } from '@/components/Article'
import Card from '@/components/Card'

import { formatDate } from '@/utils/formatDate'

/**
 * Renders a list of articles cards.
 * @param {Object} props - The props object.
 * @param {String} props.slug - The article slug.
 * @param {String} props.title - The article title.
 * @param {String} props.date - The article date.
 * @param {String} props.description - The article description.
 * @returns {JSX.Element} The rendered component.
 */
const ArticlesCardsList = (props: TArticleProps): JSX.Element => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card.Eyebrow
        as="time"
        className="mt-1 hidden md:block text-zinc-400 dark:text-zinc-500"
      >
        {formatDate(props?.date || '')}
      </Card.Eyebrow>

      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${props?.slug}`}>
          {props?.title}
        </Card.Title>
        <Card.Description>{props?.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
    </article>
  )
}

export default ArticlesCardsList
