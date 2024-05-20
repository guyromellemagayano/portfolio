import { DelHTMLAttributes, forwardRef } from 'react'

export type DeletedTextRef = HTMLModElement
export type DeletedTextProps = DelHTMLAttributes<DeletedTextRef>

/**
 * Render the deleted text component.
 * @param {DeletedTextProps} props - The deleted text component properties.
 * @param {DeletedTextRef} ref - The deleted text component reference.
 * @returns The rendered deleted text component.
 */
const DeletedText = forwardRef<DeletedTextRef, DeletedTextProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <del ref={ref} {...rest}>
        {children}
      </del>
    )
  }
)

DeletedText.displayName = 'DeletedText'

export default DeletedText
