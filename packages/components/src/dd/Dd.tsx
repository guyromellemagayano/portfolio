import { lazy, Suspense } from "react";

import type { DdProps } from "./Dd.client";

// Dynamically import the client component
const DdClient = lazy(async () => {
  const module = await import("./Dd.client");
  return { default: module.DdClient };
});

/**
 * Render the default description details server component.
 * @param {DdProps} props - The default description details server component properties
 * @returns The rendered default description details server component
 */
export const Dd = ({ isClient = false, children, ...rest }: DdProps) => {
  const element = <dd {...rest}>{children}</dd>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DdClient {...rest}>{children}</DdClient>
      </Suspense>
    );
  }

  return element;
};

Dd.displayName = "Dd";
