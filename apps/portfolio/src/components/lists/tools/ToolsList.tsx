import { forwardRef, memo } from 'react'

import { Div } from '@react-components'

import {
  SectionLayout,
  type SectionLayoutProps,
  type SectionLayoutRef
} from '@portfolio/components'

export type ToolsListRef = SectionLayoutRef
export type ToolsListProps = SectionLayoutProps

/**
 * Renders the tools list component.
 * @param {ToolsListProps} props - The component props
 * @param {ToolsListRef} ref - The component reference
 * @returns The rendered tools list component.
 */
const ToolsList = memo(
  forwardRef<ToolsListRef, ToolsListProps>(({ children, ...rest }, ref) => {
    if (!children) return null

    return (
      <SectionLayout ref={ref} {...rest}>
        <Div className="space-y-16">{children}</Div>
      </SectionLayout>
    )
  })
)

ToolsList.displayName = 'ToolsList'

export default ToolsList
