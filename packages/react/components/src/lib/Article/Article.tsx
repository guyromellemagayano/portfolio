import React from 'react'

export type ArticleRef = HTMLElement
export type ArticleProps = React.HTMLAttributes<ArticleRef>

/**
 * Render the article component
 * @param {ArticleProps} props - The article component properties
 * @param {ArticleRef} ref - The article component reference
 * @returns The rendered article component
 */
const Article = React.forwardRef<ArticleRef, ArticleProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <article ref={ref} {...rest}>
      {children}
    </article>
  )
})

Article.displayName = 'Article'

export default Article
