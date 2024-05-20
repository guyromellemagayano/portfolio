import { forwardRef } from 'react'

import {
  Ul,
  type UnorderedListProps,
  type UnorderedListRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type ProjectsListRef = UnorderedListRef
export type ProjectsListProps = UnorderedListProps

/**
 * Renders the projects list component.
 * @param {ProjectsListProps} props - The properties to render the projects list component.
 * @param {ProjectsListRef} ref - The reference of the projects list component.
 * @returns The rendered projects list component.
 */
const ProjectsList = forwardRef<ProjectsListRef, ProjectsListProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      children && (
        <Ul
          {...rest}
          ref={ref}
          className={cn(
            'grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3',
            className
          )}
        >
          {children}
        </Ul>
      )
    )
  }
)

ProjectsList.displayName = 'ProjectsList'

export default ProjectsList
