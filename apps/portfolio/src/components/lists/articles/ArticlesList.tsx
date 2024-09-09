import { forwardRef } from 'react'

import { Div, type DivisionProps, type DivisionRef } from '@react-components'

import { cn } from '@react-utils'

export type ArticlesListRef = DivisionRef
export type ArticlesListProps = DivisionProps

/**
 * Renders the articles list component.
 * @param {ArticlesListProps} props - The component props
 * @param {ArticlesListRef} ref - The component reference
 * @returns The rendered articles list component
 */
const ArticlesList = forwardRef<ArticlesListRef, ArticlesListProps>(
  ({ children, className, ...rest }, ref) => {
    if (!children) return null

    return (
      <Div
        ref={ref}
        className={cn(
          'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40',
          className
        )}
        {...rest}
      >
        {children && (
          <Div className="flex w-full max-w-3xl flex-col space-y-16">
            {children}
          </Div>
        )}
      </Div>
    )
  }
)

ArticlesList.displayName = 'ArticlesList'

export default ArticlesList
