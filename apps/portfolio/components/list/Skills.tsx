'use client'

import { ReactNode } from 'react'

import SectionLayout from '@/components/layouts/Section'

export type TSkillsListProps = {
  title: string
  children: ReactNode
}

/**
 * Renders the skills list component.
 * @param title - The title of the skills list.
 * @param children - The children of the skills list.
 * @returns The rendered skills list component.
 */
const SkillsList = ({ children, title }: TSkillsListProps): JSX.Element => {
  return (
    <SectionLayout title={title}>
      <div className="space-y-16">{children}</div>
    </SectionLayout>
  )
}

export default SkillsList
