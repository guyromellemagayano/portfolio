import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type ArticleRef = HTMLElement
export type ArticleProps = HTMLAttributes<ArticleRef>

/**
 * Render the article component.
 * @param children - The children of the article.
 * @param rest - The rest of the props of the article.
 * @returns The rendered article component.
 */
const Article = forwardRef<ArticleRef, ArticleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <article ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </article>
    )
  }
)

Article.displayName = 'Article'

export default Article
