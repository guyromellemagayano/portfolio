import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const AbbrClient = lazy(async () => {
  const module = await import("./Abbr.client");
  return { default: module.default };
});

export type AbbrRef = HTMLElement;
export type AbbrProps = HTMLAttributes<AbbrRef> & CommonComponentProps;

/**
 * Render the default abbreviation server component.
 * @param {AbbrProps} props - The default abbreviation server component properties
 * @returns The rendered default abbreviation server component
 */
export const Abbr = ({ isClient = false, children, ...rest }: AbbrProps) => {
  const element = <abbr {...rest}>{children}</abbr>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AbbrClient {...rest}>{children}</AbbrClient>
      </Suspense>
    );
  }

  return element;
};

Abbr.displayName = "Abbr";
