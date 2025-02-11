'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export type TDefinitionElementRef = HTMLElement;
export type TDefinitionElementProps = HTMLAttributes<TDefinitionElementRef>;

/**
 * Render the definition element component.
 * @param {TDefinitionElementProps} props - The definition element component properties
 * @param {TDefinitionElementRef} ref - The definition element component reference
 * @returns The rendered definition element component
 */
const DefinitionElement = forwardRef<
  TDefinitionElementRef,
  TDefinitionElementProps
>(({ children, ...rest }, ref) => {
  return (
    <dfn ref={ref} {...rest}>
      {children}
    </dfn>
  );
});

DefinitionElement.displayName = 'DefinitionElement';

export default DefinitionElement;
