'use client';

import { type ColHTMLAttributes, forwardRef } from 'react';

export type TColumnRef = HTMLTableColElement;
export type TColumnProps = ColHTMLAttributes<TColumnRef>;

/**
 * Render the column component.
 * @param {TColumnProps} props - The column component properties
 * @param {TColumnRef} ref - The column component reference
 * @returns The rendered column component
 */
const Column = forwardRef<TColumnRef, TColumnProps>(
  ({ children, ...rest }, ref) => {
    return (
      <col ref={ref} {...rest}>
        {children}
      </col>
    );
  },
);

Column.displayName = 'Column';

export default Column;
