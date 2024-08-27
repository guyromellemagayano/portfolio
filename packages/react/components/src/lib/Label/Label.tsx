'use client'

import React from 'react'

export type LabelRef = HTMLLabelElement
export type LabelProps = React.LabelHTMLAttributes<LabelRef>

/**
 * Render the label component
 * @param {LabelProps} props - The label component properties
 * @param {LabelRef} ref - The label component reference
 * @returns The rendered label component
 */
const Label = React.forwardRef<LabelRef, LabelProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <label ref={ref} {...rest}>
      {children}
    </label>
  )
})

Label.displayName = 'Label'

export default Label
