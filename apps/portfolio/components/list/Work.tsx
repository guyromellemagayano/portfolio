'use client'

import { FC } from 'react'

import SectionLayout from '@/components/layouts/Section'

import type { TContainerProps } from '@/types/common'

export type TWorkListProps = TContainerProps

/**
 * Renders the work list component.
 * @param children - The children of the work list.
 * @param rest - The rest of the props of the work list.
 * @returns The rendered work list component.
 */
const WorkList: FC<TWorkListProps> = ({ children, ...rest }) => {
  return (
    <SectionLayout {...rest}>
      <div className="space-y-16">{children}</div>
    </SectionLayout>
  )
}

export default WorkList
