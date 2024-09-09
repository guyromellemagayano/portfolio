import { forwardRef, memo } from 'react'

import { Div } from '@react-components'

import {
  SectionLayout,
  type SectionLayoutProps,
  type SectionLayoutRef
} from '@portfolio/components'

export type WorkListRef = SectionLayoutRef
export type WorkListProps = SectionLayoutProps

/**
 * Renders the work list component.
 * @param {WorkListProps} props - The component props
 * @param {WorkListRef} ref - The component reference
 * @returns The rendered work list component.
 */
const WorkList = memo(
  forwardRef<WorkListRef, WorkListProps>(({ children, ...rest }, ref) => {
    if (!children) return null

    return (
      <SectionLayout ref={ref} {...rest}>
        <Div className="space-y-16">{children}</Div>
      </SectionLayout>
    )
  })
)

WorkList.displayName = 'WorkList'

export default WorkList
