'use client'

import { DialogHTMLAttributes, forwardRef } from 'react'

export type DialogRef = HTMLDialogElement
export type DialogProps = DialogHTMLAttributes<DialogRef>

/**
 * Render the dialog component.
 * @param {DialogProps} props - The dialog component properties.
 * @param {DialogRef} ref - The dialog component reference.
 * @returns The rendered dialog component.
 */
const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <dialog ref={ref} {...rest}>
      {children}
    </dialog>
  )
})

Dialog.displayName = 'Dialog'

export default Dialog
