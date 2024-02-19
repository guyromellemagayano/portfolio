'use client'

import { FC } from 'react'

import SectionLayout from '@/components/layouts/Section'

import type { TContainerProps } from '@/types/common'

export type TToolsListProps = TContainerProps

/**
 * Renders the tools list component.
 * @param children - The children of the tools list.
 * @param rest - The rest of the props of the tools list.
 * @returns The rendered tools list component.
 */
const ToolsList: FC<TToolsListProps> = ({ children, ...rest }) => {
  return (
    children && (
      <SectionLayout {...rest}>
        <ul className="space-y-16">{children}</ul>
      </SectionLayout>
    )
  )
}

export default ToolsList
