"use client";

import { forwardRef } from "react";

import type {
  DefinitionElementProps,
  DefinitionElementRef,
} from "./DefinitionElement";

/**
 * Render the definition element client component.
 * @param {DefinitionElementProps} props - The definition element client component properties
 * @param {DefinitionElementRef} ref - The definition element client component reference
 * @returns The rendered definition element client component
 */
const DefinitionElementClient = forwardRef<
  DefinitionElementRef,
  DefinitionElementProps
>(({ children, ...rest }, ref) => {
  return (
    <dfn ref={ref} {...rest}>
      {children}
    </dfn>
  );
});

DefinitionElementClient.displayName = "DefinitionElementClient";

export default DefinitionElementClient;
