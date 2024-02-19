'use client'

import { FC, useId } from 'react'

import type { TContainerProps } from '@/types/common'

export type TProjectsListProps = TContainerProps

/**
 * Renders the projects list component.
 * @param id - The additional ID for the component.
 * @param children - The children of the projects list.
 * @param rest - The rest of the props.
 * @returns The rendered projects list component.
 */
const ProjectsList: FC<TProjectsListProps> = ({ id, children, ...rest }) => {
  const customId = useId()

  return (
    children && (
      <ul
        id={id || customId}
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        {...rest}
      >
        {children}
      </ul>
    )
  )
}

export default ProjectsList
