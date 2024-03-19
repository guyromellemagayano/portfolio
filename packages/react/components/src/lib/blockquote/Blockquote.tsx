import { BlockquoteHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type BlockquoteRef = HTMLQuoteElement
export type BlockquoteProps = BlockquoteHTMLAttributes<BlockquoteRef>

/**
 * Render the blockquote component.
 * @param children - The children of the blockquote.
 * @param rest - The rest of the props of the blockquote.
 * @returns The rendered blockquote component.
 */
const Blockquote = forwardRef<BlockquoteRef, BlockquoteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <blockquote ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </blockquote>
    )
  }
)

Blockquote.displayName = 'Blockquote'

export default Blockquote