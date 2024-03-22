'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type ArticleRef = HTMLElement
export type ArticleProps = HTMLAttributes<ArticleRef>

/**
 * Render the article component.
 * @param children - The children of the article.
 * @param rest - The rest of the props of the article.
 * @returns The rendered article component.
 */
export const Article = forwardRef<ArticleRef, ArticleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <article ref={ref} {...rest}>
        {children}
      </article>
    )
  }
)

Article.displayName = 'Article'

export default Article
