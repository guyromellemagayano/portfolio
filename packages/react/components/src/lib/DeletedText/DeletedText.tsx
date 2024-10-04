import React from 'react'

export type TDeletedTextRef = HTMLModElement
export type TDeletedTextProps = React.DelHTMLAttributes<TDeletedTextRef>

/**
 * Render the deleted text component.
 * @param {TDeletedTextProps} props - The deleted text component properties
 * @param {TDeletedTextRef} ref - The deleted text component reference
 * @returns The rendered deleted text component
 */
const DeletedText = React.forwardRef<TDeletedTextRef, TDeletedTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <del ref={ref} {...rest}>
        {children}
      </del>
    )
  }
)

DeletedText.displayName = 'DeletedText'

export default DeletedText
