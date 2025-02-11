import React from 'react'

export type TLabelRef = HTMLLabelElement
export type TLabelProps = React.LabelHTMLAttributes<TLabelRef>

/**
 * Render the label component.
 * @param {TLabelProps} props - The label component properties
 * @param {TLabelRef} ref - The label component reference
 * @returns The rendered label component
 */
const Label = React.forwardRef<TLabelRef, TLabelProps>(
  ({ children, ...rest }, ref) => {
    return (
      <label ref={ref} {...rest}>
        {children}
      </label>
    )
  }
)

Label.displayName = 'Label'

export default Label
