import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SpanClient = lazy(async () => {
  const module = await import("./Span.client");
  return { default: module.SpanClient };
});

export type SpanRef = HTMLSpanElement;
export type SpanProps = HTMLAttributes<SpanRef> & CommonComponentProps;

/**
 * Render the default content span server component.
 * @param {SpanProps} props - The default content span server component properties
 * @returns The rendered default content span server component
 */
export const Span = ({ isClient = false, children, ...rest }: SpanProps) => {
  const element = <span {...rest}>{children}</span>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SpanClient {...rest}>{children}</SpanClient>
      </Suspense>
    );
  }

  return element;
};

Span.displayName = "Span";
