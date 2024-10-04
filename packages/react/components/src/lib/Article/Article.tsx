import React from 'react'

export type TArticleRef = HTMLElement
export type TArticleProps = React.HTMLAttributes<TArticleRef>

/**
 * Render the article component.
 * @param {TArticleProps} props - The article component properties
 * @param {TArticleRef} ref - The article component reference
 * @returns The rendered article component
 */
const Article = React.forwardRef<TArticleRef, TArticleProps>(
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
