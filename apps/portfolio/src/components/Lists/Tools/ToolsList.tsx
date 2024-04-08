import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  SectionLayoutProps,
  SectionLayoutRef
} from '@guy-romelle-magayano/portfolio/components/Layouts/Section'

// Dynamic imports
const Ul = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Ul)
)
const SectionLayout = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Layouts/Section').then(
    mod => mod.SectionLayout
  )
)

export type ToolsListRef = SectionLayoutRef
export type ToolsListProps = SectionLayoutProps

/**
 * Renders the tools list component.
 * @param children - The children of the tools list.
 * @param rest - The rest of the props of the tools list.
 * @returns The rendered tools list component.
 */
const ToolsList = forwardRef<ToolsListRef, ToolsListProps>(
  ({ children, ...rest }, ref) => {
    return (
      children && (
        <SectionLayout ref={ref} {...rest}>
          <Ul className="space-y-16">{children}</Ul>
        </SectionLayout>
      )
    )
  }
)

export default ToolsList
