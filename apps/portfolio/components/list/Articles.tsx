'use client'

import { FC, useId } from 'react'

import type { TContainerProps } from '@/types/common'

export type TArticlesListProps = TContainerProps

/**
 * Renders the articles list component.
 * @param children - The children of the articles list.
 * @returns The rendered articles list component.
 */
const ArticlesList: FC<TContainerProps> = ({ id, children, ...rest }) => {
  const customId = useId()

  return (
    <div id={id || customId} {...rest}>
      <div className="flex max-w-3xl flex-col space-y-16">{children}</div>
    </div>
  )
}

export default ArticlesList
