import { lazy, Suspense } from "react";

import type { CenterProps } from "./Center.client";

// Dynamically import the client component
const CenterClient = lazy(async () => {
  const module = await import("./Center.client");
  return { default: module.CenterClient };
});

/**
 * Render the default center server component.
 * @param {CenterProps} props - The default center server component properties
 * @returns The rendered default center server component
 */
export const Center = ({
  isClient = false,
  children,
  ...rest
}: CenterProps) => {
  const element = <center {...rest}>{children}</center>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CenterClient {...rest}>{children}</CenterClient>
      </Suspense>
    );
  }

  return element;
};

Center.displayName = "Center";
