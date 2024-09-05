import React, { TableHTMLAttributes } from 'react'

export type CaptionRef = HTMLTableCaptionElement
export type CaptionProps = TableHTMLAttributes<CaptionRef>

/**
 * Render the caption component.
 * @param {CaptionProps} props - The caption component properties
 * @param {CaptionRef} ref - The caption component reference
 * @returns The rendered caption component
 */
const Caption = React.forwardRef<CaptionRef, CaptionProps>(
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
