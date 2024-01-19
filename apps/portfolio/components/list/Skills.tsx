'use client'

import { ReactNode } from 'react'

import SectionLayout from '@/components/layouts/Section'

export type TSkillsListProps = {
  title: string
  children: ReactNode
}

/**
 * Renders a list of skills.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const SkillsList = ({ children, title }: TSkillsListProps): JSX.Element => {
  return (
    <SectionLayout title={title}>
      <div className="space-y-16">{children}</div>
    </SectionLayout>
  )
}

export default SkillsList
