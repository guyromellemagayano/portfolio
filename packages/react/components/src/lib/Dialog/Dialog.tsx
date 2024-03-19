import { DialogHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type DialogRef = HTMLDialogElement
export type DialogProps = DialogHTMLAttributes<DialogRef>

/**
 * Render the dialog component.
 * @param children - The children of the dialog.
 * @param rest - The rest of the props of the dialog.
 * @returns The rendered dialog component.
 */
const Dialog = forwardRef<DialogRef, DialogProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dialog ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </dialog>
    )
  }
)

Dialog.displayName = 'Dialog'

export default Dialog
