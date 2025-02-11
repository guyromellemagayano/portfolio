'use client';

import { type ColgroupHTMLAttributes, forwardRef } from 'react';

export type TColumnGroupRef = HTMLTableColElement;
export type TColumnGroupProps = ColgroupHTMLAttributes<TColumnGroupRef>;

/**
 * Render the column group component.
 * @param {TColumnGroupProps} props - The column group component properties
 * @param {TColumnGroupRef} ref - The column group component reference
 * @returns The rendered column group component
 */
const ColumnGroup = forwardRef<TColumnGroupRef, TColumnGroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <colgroup ref={ref} {...rest}>
        {children}
      </colgroup>
    );
  },
);

ColumnGroup.displayName = 'ColumnGroup';

export default ColumnGroup;
