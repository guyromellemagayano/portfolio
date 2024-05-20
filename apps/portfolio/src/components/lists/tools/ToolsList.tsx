import { forwardRef } from 'react'

import { Ul } from '@guy-romelle-magayano/react-components/server'

import {
  SectionLayout,
  type SectionLayoutProps,
  type SectionLayoutRef
} from '@guy-romelle-magayano/portfolio/components'

export type ToolsListRef = SectionLayoutRef
export type ToolsListProps = SectionLayoutProps

/**
 * Renders the tools list component.
 * @param {ToolsListProps} props - The properties to render the tools list component.
 * @param {ToolsListRef} ref - The reference of the tools list component.
 * @returns The rendered tools list component.
 */
const ToolsList = forwardRef<ToolsListRef, ToolsListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <SectionLayout {...rest} ref={ref}>
        {children && <Ul className="space-y-16">{children}</Ul>}
      </SectionLayout>
    )
  }
)

ToolsList.displayName = 'ToolsList'

export default ToolsList
