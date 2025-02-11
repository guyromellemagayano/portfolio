'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export type TDatalistRef = HTMLDataListElement;
export type TDatalistProps = HTMLAttributes<TDatalistRef>;

/**
 * Render the datalist component.
 * @param {TDatalistProps} props - The datalist component properties
 * @param {TDatalistRef} ref - The datalist component reference
 * @returns The rendered datalist component
 */
const Datalist = forwardRef<TDatalistRef, TDatalistProps>(
  ({ children, ...rest }, ref) => {
    return (
      <datalist ref={ref} {...rest}>
        {children}
      </datalist>
    );
  },
);

Datalist.displayName = 'Datalist';

export default Datalist;
