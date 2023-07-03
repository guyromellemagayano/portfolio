import { IArticleProps } from '@/interfaces/components'
import { formatDate } from '@/lib/formatDate'
import Card from './Card'

// Article component
const Article = ({ slug, meta: { title, date, description } }: IArticleProps): React.ReactNode => {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={date} className="text-zinc-400 dark:text-zinc-500" decorate>
        {formatDate(date)}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export default Article
