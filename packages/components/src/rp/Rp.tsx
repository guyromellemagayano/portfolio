import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const RpClient = lazy(async () => {
  const module = await import("./Rp.client");
  return { default: module.RpClient };
});

export type RpRef = HTMLElement;
export type RpProps = HTMLAttributes<RpRef> & CommonComponentProps;

/**
 * Render the default ruby fallback parenthesis server component.
 * @param {RpProps} props - The default ruby fallback parenthesis server component properties
 * @returns The rendered default ruby fallback parenthesis server component
 */
export const Rp = ({ isClient = false, children, ...rest }: RpProps) => {
  const element = <q {...rest}>{children}</q>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <RpClient {...rest}>{children}</RpClient>
      </Suspense>
    );
  }

  return element;
};

Rp.displayName = "Rp";
