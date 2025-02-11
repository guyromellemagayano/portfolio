'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export type TCiteRef = HTMLQuoteElement;
export type TCiteProps = HTMLAttributes<TCiteRef>;

/**
 * Render the cite component.
 * @param {TCiteProps} props - The cite component properties
 * @param {TCiteRef} ref - The cite component reference
 * @returns The rendered cite component
 */
const Cite = forwardRef<TCiteRef, TCiteProps>(({ children, ...rest }, ref) => {
  return (
    <cite ref={ref} {...rest}>
      {children}
    </cite>
  );
});

Cite.displayName = 'Cite';

export default Cite;
