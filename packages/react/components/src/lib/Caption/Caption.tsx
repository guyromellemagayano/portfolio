import React, { TableHTMLAttributes } from 'react'

export type TCaptionRef = HTMLTableCaptionElement
export type TCaptionProps = TableHTMLAttributes<TCaptionRef>

/**
 * Render the caption component.
 * @param {TCaptionProps} props - The caption component properties
 * @param {TCaptionRef} ref - The caption component reference
 * @returns The rendered caption component
 */
const Caption = React.forwardRef<TCaptionRef, TCaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <caption ref={ref} {...rest}>
        {children}
      </caption>
    )
  }
)

Caption.displayName = 'Caption'

export default Caption
