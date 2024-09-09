'use client'

import React from 'react'

export type DialogRef = HTMLDialogElement
export type DialogProps = React.DialogHTMLAttributes<DialogRef>

/**
 * Render the dialog component
 * @param {DialogProps} props - The dialog component properties
 * @param {DialogRef} ref - The dialog component reference
 * @returns The rendered dialog component
 */
const Dialog = React.forwardRef<DialogRef, DialogProps>(
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
