import { DelHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type DeletedTextRef = HTMLModElement
export type DeletedTextProps = DelHTMLAttributes<DeletedTextRef>

/**
 * Render the deleted text component.
 * @param children - The children of the deleted text.
 * @param rest - The rest of the props of the deleted text.
 * @returns The rendered deleted text component.
 */
const DeletedText = forwardRef<DeletedTextRef, DeletedTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <del ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </del>
    )
  }
)

DeletedText.displayName = 'DeletedText'

export default DeletedText
