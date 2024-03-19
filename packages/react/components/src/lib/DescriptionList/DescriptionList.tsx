import { HTMLAttributes, forwardRef } from 'react'

export type DescriptionListRef = HTMLDListElement
export type DescriptionListProps = HTMLAttributes<DescriptionListRef>

/**
 * Render the description list component.
 * @param children - The children of the description list.
 * @param rest - The rest of the props of the description list.
 * @returns The rendered description list component.
 */
const DescriptionList = forwardRef<DescriptionListRef, DescriptionListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dl ref={ref} {...rest}>
        {children}
      </dl>
    )
  }
)

DescriptionList.displayName = 'DescriptionList'

export default DescriptionList
