import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const BidirectionalTextOverrideClient = lazy(async () => {
  const module = await import("./BidirectionalTextOverride.client");
  return { default: module.default };
});

export type BidirectionalTextOverrideRef = HTMLElement;
export type BidirectionalTextOverrideProps =
  HTMLAttributes<BidirectionalTextOverrideRef> & CommonComponentProps;

/**
 * Render the default bidirectional text override server component.
 * @param {BidirectionalTextOverrideProps} props - The default bidirectional text override server component properties
 * @returns The rendered default bidirectional text override server component
 */
const BidirectionalTextOverride = ({
  isClient = false,
  children,
  ...rest
}: BidirectionalTextOverrideProps) => {
  const element = <bdo {...rest}>{children}</bdo>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BidirectionalTextOverrideClient {...rest}>
          {children}
        </BidirectionalTextOverrideClient>
      </Suspense>
    );
  }

  return element;
};

BidirectionalTextOverride.displayName = "BidirectionalTextOverride";

export default BidirectionalTextOverride;
