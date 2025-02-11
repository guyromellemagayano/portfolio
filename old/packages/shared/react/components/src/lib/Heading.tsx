'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export type THeadingRef = HTMLHeadingElement;
export type THeadingProps = HTMLAttributes<THeadingRef> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

/**
 * Render the heading component
 * @param {THeadingProps} props - The heading component properties
 * @param {THeadingRef} ref - The heading component reference
 * @returns The rendered heading component
 */
const Heading = forwardRef<THeadingRef, THeadingProps>(
  ({ as: Component = 'h1', children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  },
);

Heading.displayName = 'Heading';

export default Heading;
