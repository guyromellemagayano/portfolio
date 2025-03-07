import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DetailsClient = lazy(async () => {
  const module = await import("./Details.client");
  return { default: module.DetailsClient };
});

export type DetailsRef = React.ElementRef<"details">;
export type DetailsProps = React.ComponentPropsWithoutRef<"details"> &
  CommonComponentProps;

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
