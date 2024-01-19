'use client'

import SectionLayout from "@/components/layouts/Section"

import type { TWithChildren } from "@/types/common"

export type TToolsListProps<T = object> = T &
  TWithChildren<T> & {
    title?: string | null
  }

/**
 * Renders a list of tools.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const ToolsList = ({ children, ...rest }: TToolsListProps): JSX.Element => {
  return (
    <SectionLayout {...rest}>
      <ul className="space-y-16">{children}</ul>
    </SectionLayout>
  )
}

export default ToolsList
