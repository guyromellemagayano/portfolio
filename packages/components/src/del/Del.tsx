import { lazy, Suspense } from "react";

import type { DelProps } from "./Del.client";

// Dynamically import the client component
const DelClient = lazy(async () => {
  const module = await import("./Del.client");
  return { default: module.DelClient };
});

/**
 * Render the default deleted text server component.
 * @param {DelProps} props - The default deleted text server component properties
 * @returns The rendered default deleted text server component
 */
export const Del = ({ isClient = false, children, ...rest }: DelProps) => {
  const element = <del {...rest}>{children}</del>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DelClient {...rest}>{children}</DelClient>
      </Suspense>
    );
  }

  return element;
};

Del.displayName = "Del";
