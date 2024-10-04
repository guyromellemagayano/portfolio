import React from 'react'

export type TDialogRef = HTMLDialogElement
export type TDialogProps = React.DialogHTMLAttributes<TDialogRef>

/**
 * Render the dialog component
 * @param {TDialogProps} props - The dialog component properties
 * @param {TDialogRef} ref - The dialog component reference
 * @returns The rendered dialog component
 */
const Dialog = React.forwardRef<TDialogRef, TDialogProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dialog ref={ref} {...rest}>
        {children}
      </dialog>
    )
  }
)

Dialog.displayName = 'Dialog'

export default Dialog
