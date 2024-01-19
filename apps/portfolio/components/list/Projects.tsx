'use client'

import type { TWithChildren } from "@/types/common"

export type TProjectsListProps<T = object> = T & TWithChildren<T>

/**
 * Renders a list of projects.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const ProjectsList = ({ children }: TProjectsListProps): JSX.Element => {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  )
}

export default ProjectsList
