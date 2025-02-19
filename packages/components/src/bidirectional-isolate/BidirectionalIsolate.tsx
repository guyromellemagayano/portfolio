import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const BidirectionalIsolateClient = lazy(async () => {
  const module = await import("./BidirectionalIsolate.client");
  return { default: module.default };
});

export type BidirectionalIsolateRef = HTMLElement;
export type BidirectionalIsolateProps =
  HTMLAttributes<BidirectionalIsolateRef> & CommonComponentProps;

/**
 * Render the default bidirectional isolate server component.
 * @param {BidirectionalIsolateProps} props - The default bidirectional isolate server component properties
 * @returns The rendered default bidirectional isolate server component
 */
const BidirectionalIsolate = ({
  isClient = false,
  children,
  ...rest
}: BidirectionalIsolateProps) => {
  const element = <bdi {...rest}>{children}</bdi>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BidirectionalIsolateClient {...rest}>
          {children}
        </BidirectionalIsolateClient>
      </Suspense>
    );
  }

  return element;
};

BidirectionalIsolate.displayName = "BidirectionalIsolate";

export default BidirectionalIsolate;
