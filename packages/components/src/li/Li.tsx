import { type LiHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const LiClient = lazy(async () => {
  const module = await import("./Li.client");
  return { default: module.LiClient };
});

export type LiRef = HTMLLIElement;
export type LiProps = LiHTMLAttributes<LiRef> & CommonComponentProps;

/**
 * Render the default list item server component.
 * @param {LiProps} props - The default list item server component properties
 * @returns The rendered default list item server component
 */
export const Li = ({ isClient = false, children, ...rest }: LiProps) => {
  const element = <li {...rest}>{children}</li>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <LiClient {...rest}>{children}</LiClient>
      </Suspense>
    );
  }

  return element;
};

Li.displayName = "Li";
