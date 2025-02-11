'use client';

import { type BlockquoteHTMLAttributes, forwardRef } from 'react';

export type TBlockquoteRef = HTMLQuoteElement;
export type TBlockquoteProps = BlockquoteHTMLAttributes<TBlockquoteRef>;

/**
 * Render the blockquote component.
 * @param {TBlockquoteProps} props - The blockquote component properties
 * @param {TBlockquoteRef} ref - The blockquote component reference
 * @returns The rendered blockquote component
 */
const Blockquote = forwardRef<TBlockquoteRef, TBlockquoteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <blockquote ref={ref} {...rest}>
        {children}
      </blockquote>
    );
  },
);

Blockquote.displayName = 'Blockquote';

export default Blockquote;
