import { lazy, Suspense } from "react";

import type { DfnProps } from "./Dfn.client";

// Dynamically import the client component
const DefinitionElementClient = lazy(async () => {
  const module = await import("./Dfn.client");
  return { default: module.DfnClient };
});

/**
 * Render the default definition element server component.
 * @param {DfnProps} props - The default definition element server component properties
 * @returns The rendered default definition element server component
 */
export const DefinitionElement = ({
  isClient = false,
  children,
  ...rest
}: DfnProps) => {
  const element = <dfn {...rest}>{children}</dfn>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DefinitionElementClient {...rest}>{children}</DefinitionElementClient>
      </Suspense>
    );
  }

  return element;
};

DefinitionElement.displayName = "DefinitionElement";
