import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ThClient = lazy(async () => {
  const module = await import("./Th.client");
  return { default: module.ThClient };
});

export type ThRef = React.ElementRef<"th">;
export type ThProps = React.ComponentPropsWithoutRef<"th"> &
  CommonComponentProps;

/**
 * Render the default table header server component.
 * @param {ThProps} props - The default table header server component properties
 * @returns The rendered default table header server component
 */
export const Th = ({ isClient = false, children, ...rest }: ThProps) => {
  const element = <th {...rest}>{children}</th>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ThClient {...rest}>{children}</ThClient>
      </Suspense>
    );
  }

  return element;
};

Th.displayName = "Th";
