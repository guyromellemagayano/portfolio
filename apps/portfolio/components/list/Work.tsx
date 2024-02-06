'use client'

import { ReactNode } from 'react'

import SectionLayout from '@/components/layouts/Section'

import type { TWithChildren } from '@/types/common'

export type TWorkListProps<T = object> = T &
  TWithChildren<T> & {
    title?: string | null
  }

/**
 * Renders the work list component.
 * @param children - The children of the work list.
 * @returns The rendered work list component.
 */
const WorkList = ({ children, ...rest }: TWorkListProps): ReactNode => {
  return (
    <SectionLayout {...rest}>
      <div className="space-y-16">{children}</div>
    </SectionLayout>
  )
}

export default WorkList
