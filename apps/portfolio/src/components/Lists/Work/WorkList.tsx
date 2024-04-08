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

export type WorkListRef = SectionLayoutRef
export type WorkListProps = SectionLayoutProps

/**
 * Renders the work list component.
 * @param children - The children of the work list.
 * @param rest - The rest of the props of the work list.
 * @returns The rendered work list component.
 */
const WorkList = forwardRef<WorkListRef, WorkListProps>(
  ({ children, ...rest }, ref) => {
    return (
      children && (
        <SectionLayout ref={ref} {...rest}>
          <Div className="space-y-16">{children}</Div>
        </SectionLayout>
      )
    )
  }
)

WorkList.displayName = 'WorkList'

export default WorkList
