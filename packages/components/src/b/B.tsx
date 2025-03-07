import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const BClient = lazy(async () => {
  const module = await import("./B.client");
  return { default: module.BClient };
});

export type BRef = React.ElementRef<"b">;
export type BProps = React.ComponentPropsWithoutRef<"b"> & CommonComponentProps;

/**
 * Render the default bring attention to server component.
 * @param {BProps} props - The default bring attention to server component properties
 * @returns The rendered default bring attention to server component
 */
export const B = ({ isClient = false, children, ...rest }: BProps) => {
  const element = <b {...rest}>{children}</b>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BClient {...rest}>{children}</BClient>
      </Suspense>
    );
  }

  return element;
};

B.displayName = "B";
