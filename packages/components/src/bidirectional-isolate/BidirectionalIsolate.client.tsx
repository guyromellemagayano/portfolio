"use client";

import { forwardRef } from "react";

import type {
  BidirectionalIsolateProps,
  BidirectionalIsolateRef,
} from "./BidirectionalIsolate";

/**
 * Render the bidirectional isolate client component.
 * @param {BidirectionalIsolateProps} props - The bidirectional isolate client component properties
 * @param {BidirectionalIsolateRef} ref - The bidirectional isolate client component reference
 * @returns The rendered bidirectional isolate client component
 */
const BidirectionalIsolateClient = forwardRef<
  BidirectionalIsolateRef,
  BidirectionalIsolateProps
>(({ children, ...rest }, ref) => {
  return (
    <bdi ref={ref} {...rest}>
      {children}
    </bdi>
  );
});

BidirectionalIsolateClient.displayName = "BidirectionalIsolateClient";

export default BidirectionalIsolateClient;
