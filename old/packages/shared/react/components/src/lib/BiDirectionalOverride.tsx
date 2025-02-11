'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export type TBiDirectionalOverrideRef = HTMLElement;
export type TBiDirectionalOverrideProps =
  HTMLAttributes<TBiDirectionalOverrideRef>;

/**
 * Render the bi-directional override component.
 * @param {TBiDirectionalOverrideProps} props - The bi-directional override component properties
 * @param {TBiDirectionalOverrideRef} ref - The bi-directional override component reference
 * @returns The rendered bi-directional override component
 */
const BiDirectionalOverride = forwardRef<
  TBiDirectionalOverrideRef,
  TBiDirectionalOverrideProps
>(({ children, ...rest }, ref) => {
  return (
    <bdo ref={ref} {...rest}>
      {children}
    </bdo>
  );
});

BiDirectionalOverride.displayName = 'BiDirectionalOverride';

export default BiDirectionalOverride;
