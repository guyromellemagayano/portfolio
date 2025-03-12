import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const UlClient = lazy(async () => {
  const module = await import("./Ul.client");
  return { default: module.UlClient };
});

export type UlRef = React.ElementRef<"ul">;
export type UlProps = React.ComponentPropsWithoutRef<"ul"> &
  CommonComponentProps;

/**
 * Render the default unordered list server component.
 * @param {UlProps} props - The default unordered list server component properties
 * @returns The rendered default unordered list server component
 */
export const Ul = ({ isClient = false, children, ...rest }: UlProps) => {
  const element = <ul {...rest}>{children}</ul>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <UlClient {...rest}>{children}</UlClient>
      </Suspense>
    );
  }

  return element;
};

Ul.displayName = "Ul";
