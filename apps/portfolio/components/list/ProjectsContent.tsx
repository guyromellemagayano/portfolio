'use client'

import { TProjectListProps } from '@/types/components'

/**
 * Renders a list of projects.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const ProjectsList = ({ children }: TProjectListProps): JSX.Element => {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  )
}

export default ProjectsList
