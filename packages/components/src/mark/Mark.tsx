import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const MarkClient = lazy(async () => {
  const module = await import("./Mark.client");
  return { default: module.MarkClient };
});

export type MarkRef = HTMLElement;
export type MarkProps = HTMLAttributes<MarkRef> & CommonComponentProps;

/**
 * Render the default mark text server component.
 * @param {MarkProps} props - The default mark text server component properties
 * @returns The rendered default mark text server component
 */
export const Mark = ({ isClient = false, children, ...rest }: MarkProps) => {
  const element = <mark {...rest}>{children}</mark>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <MarkClient {...rest}>{children}</MarkClient>
      </Suspense>
    );
  }

  return element;
};

Mark.displayName = "Mark";
