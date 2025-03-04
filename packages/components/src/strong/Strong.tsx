import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const StrongClient = lazy(async () => {
  const module = await import("./Strong.client");
  return { default: module.StrongClient };
});

export type StrongRef = HTMLElement;
export type StrongProps = HTMLAttributes<StrongRef> & CommonComponentProps;

/**
 * Render the default strong importance server component.
 * @param {StrongProps} props - The default strong importance server component properties
 * @returns The rendered default strong importance server component
 */
export const Strong = ({
  isClient = false,
  children,
  ...rest
}: StrongProps) => {
  const element = <strong {...rest}>{children}</strong>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <StrongClient {...rest}>{children}</StrongClient>
      </Suspense>
    );
  }

  return element;
};

Strong.displayName = "Strong";
