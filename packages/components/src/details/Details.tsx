import { lazy, Suspense } from "react";

import type { DetailsProps } from "./Details.client";

// Dynamically import the client component
const DetailsClient = lazy(async () => {
  const module = await import("./Details.client");
  return { default: module.DetailsClient };
});

/**
 * Render the default details disclosure server component.
 * @param {DetailsProps} props - The default details disclosure server component properties
 * @returns The rendered default details disclosure server component
 */
export const Details = ({
  isClient = false,
  children,
  ...rest
}: DetailsProps) => {
  const element = <details {...rest}>{children}</details>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DetailsClient {...rest}>{children}</DetailsClient>
      </Suspense>
    );
  }

  return element;
};

Details.displayName = "Details";
