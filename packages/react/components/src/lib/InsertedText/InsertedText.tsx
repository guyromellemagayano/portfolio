import React from 'react'

export type TInsertedTextRef = HTMLModElement
export type TInsertedTextProps = React.InsHTMLAttributes<TInsertedTextRef>

/**
 * Render the inserted text component.
 * @param {TInsertedTextProps} props - The inserted text component properties
 * @param {TInsertedTextRef} ref - The inserted text component reference
 * @returns The rendered inserted text component
 */
const InsertedText = React.forwardRef<TInsertedTextRef, TInsertedTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ins ref={ref} {...rest}>
        {children}
      </ins>
    )
  }
)

InsertedText.displayName = 'InsertedText'

export default InsertedText
