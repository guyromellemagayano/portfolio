import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TheadClient = lazy(async () => {
  const module = await import("./Thead.client");
  return { default: module.TheadClient };
});

export type TheadRef = React.ElementRef<"thead">;
export type TheadProps = React.ComponentPropsWithoutRef<"thead"> &
  CommonComponentProps;

/**
 * Render the default table head server component.
 * @param {TheadProps} props - The default table head server component properties
 * @returns The rendered default table head server component
 */
export const Thead = ({ isClient = false, children, ...rest }: TheadProps) => {
  const element = <thead {...rest}>{children}</thead>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TheadClient {...rest}>{children}</TheadClient>
      </Suspense>
    );
  }

  return element;
};

Thead.displayName = "Thead";
