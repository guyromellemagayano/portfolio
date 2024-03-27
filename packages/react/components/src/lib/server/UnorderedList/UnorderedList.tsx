import { HTMLAttributes, forwardRef } from 'react'

export type UnorderedListRef = HTMLUListElement
export type UnorderedListProps = HTMLAttributes<UnorderedListRef>

/**
 * Render the unordered list component.
 * @param children - The children of the unordered list.
 * @param rest - The rest of the props of the unordered list.
 * @returns The rendered unordered list component.
 */
export const UnorderedList = forwardRef<UnorderedListRef, UnorderedListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ul ref={ref} {...rest}>
        {children}
      </ul>
    )
  }
)

UnorderedList.displayName = 'UnorderedList'

export default UnorderedList
