import React from 'react'

export type InsertedTextRef = HTMLModElement
export type InsertedTextProps = React.InsHTMLAttributes<InsertedTextRef>

/**
 * Render the inserted text component
 * @param {InsertedTextProps} props - The inserted text component properties
 * @param {InsertedTextRef} ref - The inserted text component reference
 * @returns The rendered inserted text component
 */
const InsertedText = React.forwardRef<InsertedTextRef, InsertedTextProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <ins ref={ref} {...rest}>
        {children}
      </ins>
    )
  }
)

InsertedText.displayName = 'InsertedText'

export default InsertedText
