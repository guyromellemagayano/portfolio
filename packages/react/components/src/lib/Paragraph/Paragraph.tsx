import React from 'react'

export type ParagraphRef = HTMLParagraphElement
export type ParagraphProps = React.HTMLAttributes<ParagraphRef>

/**
 * Render the paragraph component.
 * @param {ParagraphProps} props - The paragraph component properties
 * @param {ParagraphRef} ref - The paragraph component reference
 * @returns The rendered paragraph component
 */
const Paragraph = React.forwardRef<ParagraphRef, ParagraphProps>(
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
