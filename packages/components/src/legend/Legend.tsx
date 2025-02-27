import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const LegendClient = lazy(async () => {
  const module = await import("./Legend.client");
  return { default: module.LegendClient };
});

export type LegendRef = HTMLLegendElement;
export type LegendProps = HTMLAttributes<LegendRef> & CommonComponentProps;

/**
 * Render the default field set legend server component.
 * @param {LegendProps} props - The default field set legend server component properties
 * @returns The rendered default field set legend server component
 */
export const Legend = ({
  isClient = false,
  children,
  ...rest
}: LegendProps) => {
  const element = <legend {...rest}>{children}</legend>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <LegendClient {...rest}>{children}</LegendClient>
      </Suspense>
    );
  }

  return element;
};

Legend.displayName = "Legend";
