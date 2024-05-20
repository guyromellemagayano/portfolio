import { HTMLAttributes, forwardRef } from 'react'

export type HeadingGroupRef = HTMLElement
export type HeadingGroupProps = HTMLAttributes<HeadingGroupRef>

/**
 * Render the heading group component.
 * @param {HeadingGroupProps} props - The heading group component properties.
 * @param {HeadingGroupRef} ref - The heading group component reference.
 * @returns The rendered heading group component.
 */
const HeadingGroup = forwardRef<HeadingGroupRef, HeadingGroupProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <hgroup ref={ref} {...rest}>
        {children}
      </hgroup>
    )
  }
)

HeadingGroup.displayName = 'HeadingGroup'

export default HeadingGroup
