import React from 'react'

export type TParagraphRef = HTMLParagraphElement
export type TParagraphProps = React.HTMLAttributes<TParagraphRef>

/**
 * Render the paragraph component.
 * @param {TParagraphProps} props - The paragraph component properties
 * @param {TParagraphRef} ref - The paragraph component reference
 * @returns The rendered paragraph component
 */
const Paragraph = React.forwardRef<TParagraphRef, TParagraphProps>(
  ({ children, ...rest }, ref) => {
    return (
      <p ref={ref} {...rest}>
        {children}
      </p>
    )
  }
)

Paragraph.displayName = 'Paragraph'

export default Paragraph
