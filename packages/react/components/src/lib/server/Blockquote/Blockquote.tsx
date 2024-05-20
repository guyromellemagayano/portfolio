import { BlockquoteHTMLAttributes, forwardRef } from 'react'

export type BlockquoteRef = HTMLQuoteElement
export type BlockquoteProps = BlockquoteHTMLAttributes<BlockquoteRef>

/**
 * Render the blockquote component.
 * @param {BlockquoteProps} props - The blockquote component properties.
 * @param {BlockquoteRef} ref - The blockquote component reference.
 * @returns The rendered blockquote component.
 */
const Blockquote = forwardRef<BlockquoteRef, BlockquoteProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <blockquote ref={ref} {...rest}>
      {children}
    </blockquote>
  )
})

Blockquote.displayName = 'Blockquote'

export default Blockquote
