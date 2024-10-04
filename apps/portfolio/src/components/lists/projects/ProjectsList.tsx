import { forwardRef } from 'react'

import {
  Ul,
  type TUnorderedListProps,
  type TUnorderedListRef
} from '@react-components'

import { cn } from '@react-utils'

export type ProjectsListRef = TUnorderedListRef
export type ProjectsListProps = TUnorderedListProps

/**
 * Renders the projects list component.
 * @param {ProjectsListProps} props - The component props
 * @param {ProjectsListRef} ref - The component reference
 * @returns The rendered projects list component
 */
const ProjectsList = forwardRef<ProjectsListRef, ProjectsListProps>(
  ({ className, children, ...rest }, ref) => {
    if (!children) return null

    return (
      <Ul
        ref={ref}
        className={cn(
          'grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3',
          className
        )}
        {...rest}
      >
        {children}
      </Ul>
    )
  }
)

ProjectsList.displayName = 'ProjectsList'

export default ProjectsList
