'use client'

import { ReactNode } from 'react'

import SectionLayout from '@/components/layouts/Section'

import type { TWithChildren } from '@/types/common'

export type TToolsListProps<T = object> = T &
  TWithChildren<T> & {
    title?: string | null
  }

/**
 * Renders the tools list component.
 * @param children - The children of the tools list.
 * @returns The rendered tools list component.
 */
const ToolsList = ({ children, ...rest }: TToolsListProps): ReactNode => {
  return (
    <SectionLayout {...rest}>
      <ul className="space-y-16">{children}</ul>
    </SectionLayout>
  )
}

export default ToolsList
