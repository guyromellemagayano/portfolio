'use client'

import { ReactNode } from 'react'

import type { TWithChildren } from '@/types/common'

/**
 * Renders the articles list component.
 * @param children - The children of the articles list.
 * @returns The rendered articles list component.
 */
const ArticlesList = ({ children }: TWithChildren): ReactNode => {
  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-3xl flex-col space-y-16">{children}</div>
    </div>
  )
}

export default ArticlesList
