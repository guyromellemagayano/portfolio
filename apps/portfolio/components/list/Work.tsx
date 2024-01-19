'use client'

import SectionLayout from "@/components/layouts/Section"

import type { TWithChildren } from "@/types/common"

export type TWorkListProps<T = object> = T &
  TWithChildren<T> & {
    title?: string | null
  }

/**
 * Renders a list of work experiences.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const WorkList = ({ children, ...rest }: TWorkListProps): JSX.Element => {
  return (
    <SectionLayout {...rest}>
      <div className="space-y-16">{children}</div>
    </SectionLayout>
  )
}

export default WorkList
