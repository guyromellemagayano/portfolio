import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)

export type ArticlesListRef = DivisionRef
export type ArticlesListProps = DivisionProps

/**
 * Renders the articles list component.
 * @param children - The children of the articles list.
 * @param rest - The other props of the articles list.
 * @returns The rendered articles list component.
 */
const ArticlesList = forwardRef<ArticlesListRef, ArticlesListProps>(
  ({ children, ...rest }, ref) => {
    return (
      children && (
        <Div ref={ref} {...rest}>
          <Div className="flex max-w-3xl flex-col space-y-16">{children}</Div>
        </Div>
      )
    )
  }
)

ArticlesList.displayName = 'ArticlesList'

export default ArticlesList
