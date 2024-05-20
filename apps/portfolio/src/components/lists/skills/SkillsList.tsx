import { forwardRef } from 'react'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  SectionLayout,
  type SectionLayoutProps,
  type SectionLayoutRef
} from '@guy-romelle-magayano/portfolio/components'

export type SkillsListRef = SectionLayoutRef
export type SkillsListProps = SectionLayoutProps & {
  title: string
}

/**
 * Renders the skills list component.
 * @param {SkillsListProps} props - The properties to render the skills list component.
 * @param {SkillsListRef} ref - The reference of the skills list component.
 * @returns The rendered skills list component.
 */
const SkillsList = forwardRef<SkillsListRef, SkillsListProps>(
  ({ title, children, ...rest }, ref) => {
    return (
      title &&
      title?.length > 0 && (
        <SectionLayout ref={ref} {...rest} title={title}>
          {children && <Div className="space-y-16">{children}</Div>}
        </SectionLayout>
      )
    )
  }
)

SkillsList.displayName = 'SkillsList'

export default SkillsList
