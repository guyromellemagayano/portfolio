import { forwardRef } from 'react'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  SectionLayout,
  type SectionLayoutProps,
  type SectionLayoutRef
} from '@guy-romelle-magayano/portfolio/components'

export type WorkListRef = SectionLayoutRef
export type WorkListProps = SectionLayoutProps

/**
 * Renders the work list component.
 * @param {WorkListProps} props - The properties to render the work list component.
 * @param {WorkListRef} ref - The reference of the work list component.
 * @returns The rendered work list component.
 */
const WorkList = forwardRef<WorkListRef, WorkListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <SectionLayout ref={ref} {...rest}>
        {children && <Div className="space-y-16">{children}</Div>}
      </SectionLayout>
    )
  }
)

WorkList.displayName = 'WorkList'

export default WorkList
