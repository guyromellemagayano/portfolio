import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const EmClient = lazy(async () => {
  const module = await import("./Em.client");
  return { default: module.EmClient };
});

export type EmRef = React.ElementRef<"em">;
export type EmProps = React.ComponentPropsWithoutRef<"em"> &
  CommonComponentProps;

/**
 * Render the default emphasis server component.
 * @param {EmProps} props - The default emphasis server component properties
 * @returns The rendered default emphasis server component
 */
export const Em = ({ isClient = false, children, ...rest }: EmProps) => {
  const element = <em {...rest}>{children}</em>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <EmClient {...rest}>{children}</EmClient>
      </Suspense>
    );
  }

  return element;
};

Em.displayName = "Em";
