import React from 'react'

export type BlockquoteRef = HTMLQuoteElement
export type BlockquoteProps = React.BlockquoteHTMLAttributes<BlockquoteRef>

/**
 * Render the blockquote component.
 * @param {BlockquoteProps} props - The blockquote component properties
 * @param {BlockquoteRef} ref - The blockquote component reference
 * @returns The rendered blockquote component
 */
const Blockquote = React.forwardRef<BlockquoteRef, BlockquoteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <blockquote ref={ref} {...rest}>
        {children}
      </blockquote>
    )
  }
)

Blockquote.displayName = 'Blockquote'

export default Blockquote
