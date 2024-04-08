import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  SectionLayoutProps,
  SectionLayoutRef
} from '@guy-romelle-magayano/portfolio/components/Layouts/Section'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const SectionLayout = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Layouts/Section').then(
    mod => mod.SectionLayout
  )
)

export type SkillsListRef = SectionLayoutRef
export type SkillsListProps = SectionLayoutProps & {
  title: string
}

/**
 * Renders the skills list component.
 * @param title - The title of the skills list.
 * @param children - The children of the skills list.
 * @param rest - The rest of the props of the skills list.
 * @returns The rendered skills list component.
 */
const SkillsList = forwardRef<SkillsListRef, SkillsListProps>(
  ({ title, children, ...rest }, ref) => {
    return (
      children && (
        <SectionLayout ref={ref} {...rest} title={title}>
          <Div className="space-y-16">{children}</Div>
        </SectionLayout>
      )
    )
  }
)

SkillsList.displayName = 'SkillsList'

export default SkillsList
