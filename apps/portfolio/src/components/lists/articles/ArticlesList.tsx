import { forwardRef } from 'react'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type ArticlesListRef = DivisionRef
export type ArticlesListProps = DivisionProps

/**
 * Renders the articles list component.
 * @param {ArticlesListProps} props - The properties to render the articles list component.
 * @param {ArticlesListRef} ref - The reference of the articles list component.
 * @returns The rendered articles list component.
 */
const ArticlesList = forwardRef<ArticlesListRef, ArticlesListProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Div
        {...rest}
        ref={ref}
        className={cn(
          'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40',
          className
        )}
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
