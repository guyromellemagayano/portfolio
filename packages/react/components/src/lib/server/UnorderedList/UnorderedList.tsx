import { HTMLAttributes, forwardRef } from 'react'

export type UnorderedListRef = HTMLUListElement
export type UnorderedListProps = HTMLAttributes<UnorderedListRef>

/**
 * Render the unordered list component.
 * @param {UnorderedListProps} props - The unordered list component properties.
 * @param {UnorderedListRef} ref - The unordered list component reference.
 * @returns The rendered unordered list component.
 */
const UnorderedList = forwardRef<UnorderedListRef, UnorderedListProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <ul ref={ref} {...rest}>
        {children}
      </ul>
    )
  }
)

UnorderedList.displayName = 'UnorderedList'

export default UnorderedList
