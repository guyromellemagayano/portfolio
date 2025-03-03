import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const NoscriptClient = lazy(async () => {
  const module = await import("./Noscript.client");
  return { default: module.NoscriptClient };
});

export type NoscriptRef = HTMLElement;
export type NoscriptProps = HTMLAttributes<NoscriptRef> & CommonComponentProps;

/**
 * Render the default noscript server component.
 * @param {NoscriptProps} props - The default noscript server component properties
 * @returns The rendered default noscript server component
 */
export const Noscript = ({
  isClient = false,
  children,
  ...rest
}: NoscriptProps) => {
  const element = <noscript {...rest}>{children}</noscript>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <NoscriptClient {...rest}>{children}</NoscriptClient>
      </Suspense>
    );
  }

  return element;
};

Noscript.displayName = "Noscript";
