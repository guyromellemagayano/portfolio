'use client'

import { LabelHTMLAttributes, forwardRef } from 'react'

export type LabelRef = HTMLLabelElement
export type LabelProps = LabelHTMLAttributes<LabelRef>

/**
 * Render the label component.
 * @param {LabelProps} props - The label component properties.
 * @param {LabelRef} ref - The label component reference.
 * @returns The rendered label component.
 */
const Label = forwardRef<LabelRef, LabelProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <label ref={ref} {...rest}>
      {children}
    </label>
  )
})

Label.displayName = 'Label'

export default Label
