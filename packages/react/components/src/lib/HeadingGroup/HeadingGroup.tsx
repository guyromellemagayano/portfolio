import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type HeadingGroupRef = HTMLElement
export type HeadingGroupProps = HTMLAttributes<HeadingGroupRef>

/**
 * Render the heading group component.
 * @param children - The children of the heading group.
 * @param rest - The rest of the props of the heading group.
 * @returns The rendered heading group component.
 */
const HeadingGroup = forwardRef<HeadingGroupRef, HeadingGroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <hgroup ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </hgroup>
    )
  }
)

HeadingGroup.displayName = 'HeadingGroup'

export default HeadingGroup