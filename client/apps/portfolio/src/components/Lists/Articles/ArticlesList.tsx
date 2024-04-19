import { forwardRef } from 'react'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isEmpty } from '@guy-romelle-magayano/react-utils'

export type ArticlesListRef = DivisionRef
export type ArticlesListProps = DivisionProps

/**
 * Renders the articles list component.
 * @param children - The children of the articles list.
 * @param className - The class name of the articles list.
 * @param rest - The other props of the articles list.
 * @returns The rendered articles list component.
 */
const ArticlesList = forwardRef<ArticlesListRef, ArticlesListProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <Div
          ref={ref}
          {...rest}
          className={cn(
            'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40',
            className
          )}
        >
          <Div className="flex max-w-3xl flex-col space-y-16">{children}</Div>
        </Div>
      )
    )
  }
)

ArticlesList.displayName = 'ArticlesList'

export default ArticlesList
