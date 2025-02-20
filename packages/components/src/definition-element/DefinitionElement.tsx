import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DefinitionElementClient = lazy(async () => {
  const module = await import("./DefinitionElement.client");
  return { default: module.default };
});

export type DefinitionElementRef = HTMLElement;
export type DefinitionElementProps = HTMLAttributes<DefinitionElementRef> &
  CommonComponentProps;

/**
 * Render the default definition element server component.
 * @param {DefinitionElementProps} props - The default definition element server component properties
 * @returns The rendered default definition element server component
 */
const DefinitionElement = ({
  isClient = false,
  children,
  ...rest
}: DefinitionElementProps) => {
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

export default DefinitionElement;
