import { HTMLAttributes, forwardRef } from 'react'

export type ParagraphRef = HTMLParagraphElement
export type ParagraphProps = HTMLAttributes<ParagraphRef>

/**
 * Render the paragraph component.
 * @param {ParagraphProps} props - The paragraph component properties.
 * @param {ParagraphRef} ref - The paragraph component reference.
 * @returns The rendered paragraph component.
 */
const Paragraph = forwardRef<ParagraphRef, ParagraphProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <p ref={ref} {...rest}>
      {children}
    </p>
  )
})

Paragraph.displayName = 'Paragraph'

export default Paragraph
