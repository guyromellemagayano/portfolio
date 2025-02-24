import { lazy, Suspense } from "react";

import type { BigProps } from "./Big.client";

// Dynamically import the client component
const BigClient = lazy(async () => {
  const module = await import("./Big.client");
  return { default: module.BigClient };
});

/**
 * Render the default bigger text server component.
 * @param {BigProps} props - The default bigger text server component properties
 * @returns The rendered default bigger text server component
 */
export const Big = ({ isClient = false, children, ...rest }: BigProps) => {
  const element = <big {...rest}>{children}</big>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BigClient {...rest}>{children}</BigClient>
      </Suspense>
    );
  }

  return element;
};

Big.displayName = "Big";
