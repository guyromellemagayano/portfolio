'use client';

import { type AreaHTMLAttributes, forwardRef } from 'react';

export type TAreaRef = HTMLAreaElement;
export type TAreaProps = AreaHTMLAttributes<TAreaRef>;

/**
 * Render the area component.
 * @param {TAreaProps} props - The area component properties
 * @param {TAreaRef} ref - The area component reference
 * @returns The rendered area component
 */
const Area = forwardRef<TAreaRef, TAreaProps>(
  ({ alt, children, ...rest }, ref) => {
    return (
      <area ref={ref} alt={alt} {...rest}>
        {children}
      </area>
    );
  },
);

Area.displayName = 'Area';

export default Area;
