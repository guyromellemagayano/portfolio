'use client'

import { BlockquoteHTMLAttributes, forwardRef } from 'react'

export type BlockquoteRef = HTMLQuoteElement
export type BlockquoteProps = BlockquoteHTMLAttributes<BlockquoteRef>

/**
 * Render the blockquote component.
 * @param children - The children of the blockquote.
 * @param rest - The rest of the props of the blockquote.
 * @returns The rendered blockquote component.
 */
export const Blockquote = forwardRef<BlockquoteRef, BlockquoteProps>(
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
