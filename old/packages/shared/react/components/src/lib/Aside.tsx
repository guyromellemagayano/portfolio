'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export type TAsideRef = HTMLElement;
export type TAsideProps = HTMLAttributes<TAsideRef>;

/**
 * Render the aside component.
 * @param {TAsideProps} props - The aside component properties
 * @param {TAsideRef} ref - The aside component reference
 * @returns The rendered aside component
 */
const Aside = forwardRef<TAsideRef, TAsideProps>(
  ({ children, ...rest }, ref) => {
    return (
      <aside ref={ref} {...rest}>
        {children}
      </aside>
    );
  },
);

Aside.displayName = 'Aside';

export default Aside;
