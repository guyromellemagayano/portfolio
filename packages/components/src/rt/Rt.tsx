import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const RtClient = lazy(async () => {
  const module = await import("./Rt.client");
  return { default: module.RtClient };
});

export type RtRef = React.ElementRef<"rt">;
export type RtProps = React.ComponentPropsWithoutRef<"rt"> &
  CommonComponentProps;

/**
 * Render the default ruby text server component.
 * @param {RtProps} props - The default ruby text server component properties
 * @returns The rendered default ruby text server component
 */
export const Rt = ({ isClient = false, children, ...rest }: RtProps) => {
  const element = <rt {...rest}>{children}</rt>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <RtClient {...rest}>{children}</RtClient>
      </Suspense>
    );
  }

  return element;
};

Rt.displayName = "Rt";
