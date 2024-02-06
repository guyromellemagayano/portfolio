'use client'

import type { TArticleProps } from '@/components/Article'
import Card from '@/components/Card'

import { formatDate } from '@/utils/formatDate'

/**
 * Renders the articles cards list component.
 * @param props - The article props.
 * @returns The rendered articles cards list component.
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
