import { lazy, Suspense } from "react";

import type { BdiProps } from "./Bdi.client";

// Dynamically import the client component
const BdiClient = lazy(async () => {
  const module = await import("./Bdi.client");
  return { default: module.BdiClient };
});

/**
 * Render the default bidirectional isolate server component.
 * @param {BdiProps} props - The default bidirectional isolate server component properties
 * @returns The rendered default bidirectional isolate server component
 */
export const Bdi = ({ isClient = false, children, ...rest }: BdiProps) => {
  const element = <bdi {...rest}>{children}</bdi>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BdiClient {...rest}>{children}</BdiClient>
      </Suspense>
    );
  }

  return element;
};

Bdi.displayName = "Bdi";
