import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SClient = lazy(async () => {
  const module = await import("./S.client");
  return { default: module.SClient };
});

export type SRef = React.ElementRef<"s">;
export type SProps = React.ComponentPropsWithoutRef<"s"> & CommonComponentProps;

/**
 * Render the default strikethrough server component.
 * @param {SProps} props - The default strikethrough server component properties
 * @returns The rendered default strikethrough server component
 */
export const S = ({ isClient = false, children, ...rest }: SProps) => {
  const element = <s {...rest}>{children}</s>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SClient {...rest}>{children}</SClient>
      </Suspense>
    );
  }

  return element;
};

S.displayName = "S";
