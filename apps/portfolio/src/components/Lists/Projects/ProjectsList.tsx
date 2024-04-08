import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  UnorderedListProps,
  UnorderedListRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type ProjectsListRef = UnorderedListRef
export type ProjectsListProps = UnorderedListProps

// Dynamic imports
const Ul = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Ul)
)

/**
 * Renders the projects list component.
 * @param children - The children of the projects list.
 * @param rest - The rest of the props.
 * @returns The rendered projects list component.
 */
const ProjectsList = forwardRef<ProjectsListRef, ProjectsListProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      children && (
        <Ul
          ref={ref}
          {...rest}
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
