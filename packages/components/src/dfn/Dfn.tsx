import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DfnClient = lazy(async () => {
  const module = await import("./Dfn.client");
  return { default: module.DfnClient };
});

export type DfnRef = React.ElementRef<"dfn">;
export type DfnProps = React.ComponentPropsWithoutRef<"dfn"> &
  CommonComponentProps;

/**
 * Render the default definition element server component.
 * @param {DfnProps} props - The default definition element server component properties
 * @returns The rendered default definition element server component
 */
export const Dfn = ({ isClient = false, children, ...rest }: DfnProps) => {
  const element = <dfn {...rest}>{children}</dfn>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DfnClient {...rest}>{children}</DfnClient>
      </Suspense>
    );
  }

  return element;
};

Dfn.displayName = "Dfn";
