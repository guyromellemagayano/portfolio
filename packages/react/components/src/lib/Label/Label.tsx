'use client'

import { LabelHTMLAttributes, forwardRef } from 'react'

export type LabelRef = HTMLLabelElement
export type LabelProps = LabelHTMLAttributes<LabelRef>

/**
 * Render the label component.
 * @param children - The children of the label.
 * @param rest - The rest of the props of the label.
 * @returns The rendered label component.
 */
const Label = forwardRef<LabelRef, LabelProps>(({ children, ...rest }, ref) => {
  return (
    <label ref={ref} {...rest}>
      {children}
    </label>
  )
})

Label.displayName = 'Label'

export default Label
