import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const RubyClient = lazy(async () => {
  const module = await import("./Ruby.client");
  return { default: module.RubyClient };
});

export type RubyRef = HTMLElement;
export type RubyProps = HTMLAttributes<RubyRef> & CommonComponentProps;

/**
 * Render the default ruby annotation server component.
 * @param {RubyProps} props - The default ruby annotation server component properties
 * @returns The rendered default ruby annotation server component
 */
export const Ruby = ({ isClient = false, children, ...rest }: RubyProps) => {
  const element = <ruby {...rest}>{children}</ruby>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <RubyClient {...rest}>{children}</RubyClient>
      </Suspense>
    );
  }

  return element;
};

Ruby.displayName = "Ruby";
