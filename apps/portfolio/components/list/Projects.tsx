'use client'

import { ReactNode } from 'react'

import type { TWithChildren } from '@/types/common'

export type TProjectsListProps<T = object> = T & TWithChildren<T>

/**
 * Renders the projects list component.
 * @param children - The children of the projects list.
 * @returns The rendered projects list component.
 */
const ProjectsList = ({ children }: TProjectsListProps): ReactNode => {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  )
}

export default ProjectsList
