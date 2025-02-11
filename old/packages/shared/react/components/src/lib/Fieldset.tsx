'use client';

import { type FieldsetHTMLAttributes, forwardRef } from 'react';

export type TFieldsetRef = HTMLFieldSetElement;
export type TFieldsetProps = FieldsetHTMLAttributes<TFieldsetRef>;

/**
 * Render the fieldset component.
 * @param {TFieldsetProps} props - The fieldset component properties
 * @param {TFieldsetRef} ref - The fieldset component reference
 * @returns The rendered fieldset component
 */
export const Fieldset = forwardRef<TFieldsetRef, TFieldsetProps>(
  ({ children, ...rest }, ref) => {
    return (
      <fieldset ref={ref} {...rest}>
        {children}
      </fieldset>
    );
  },
);

Fieldset.displayName = 'Fieldset';

export default Fieldset;
