import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const PreClient = lazy(async () => {
  const module = await import("./Pre.client");
  return { default: module.PreClient };
});

export type PreRef = HTMLPreElement;
export type PreProps = HTMLAttributes<PreRef> & CommonComponentProps;

/**
 * Render the default preformatted text server component.
 * @param {PreProps} props - The default preformatted text server component properties
 * @returns The rendered default preformatted text server component
 */
export const Pre = ({ isClient = false, children, ...rest }: PreProps) => {
  const element = <pre {...rest}>{children}</pre>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <PreClient {...rest}>{children}</PreClient>
      </Suspense>
    );
  }

  return element;
};

Pre.displayName = "Pre";
