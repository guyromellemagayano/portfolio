'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type HeadingGroupRef = HTMLElement
export type HeadingGroupProps = HTMLAttributes<HeadingGroupRef>

/**
 * Render the heading group component.
 * @param children - The children of the heading group.
 * @param rest - The rest of the props of the heading group.
 * @returns The rendered heading group component.
 */
export const HeadingGroup = forwardRef<HeadingGroupRef, HeadingGroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <hgroup ref={ref} {...rest}>
        {children}
      </hgroup>
    )
  }
)

HeadingGroup.displayName = 'HeadingGroup'

export default HeadingGroup
