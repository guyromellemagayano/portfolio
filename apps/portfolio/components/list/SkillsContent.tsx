'use client'

import { SectionLayout } from '@/components'

import { TSkillsListProps } from '@/types/components'

/**
 * Renders a list of skills.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const SkillsList = ({ children, ...rest }: TSkillsListProps): JSX.Element => {
  return (
    <SectionLayout {...rest}>
      <div className="space-y-16">{children}</div>
    </SectionLayout>
  )
}

export default SkillsList
