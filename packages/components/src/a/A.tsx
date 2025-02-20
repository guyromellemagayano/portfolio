import { lazy, Suspense } from "react";

import type { AProps } from "./A.client";

// Dynamically import the client component
const AClient = lazy(async () => {
  const module = await import("./A.client");
  return { default: module.AClient };
});

/**
 * Render the default anchor server component.
 * @param {AProps} props - The default anchor server component properties
 * @returns The rendered default anchor server component
 */
export const A = ({ isClient = false, children, ...rest }: AProps) => {
  const element = <a {...rest}>{children}</a>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AClient {...rest}>{children}</AClient>
      </Suspense>
    );
  }

  return element;
};

A.displayName = "A";
