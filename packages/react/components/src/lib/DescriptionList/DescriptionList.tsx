import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

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
      <dl ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </dl>
    )
  }
)

DescriptionList.displayName = 'DescriptionList'

export default DescriptionList
