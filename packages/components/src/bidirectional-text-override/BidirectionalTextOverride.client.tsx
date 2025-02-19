"use client";

import { forwardRef } from "react";

import type {
  BidirectionalTextOverrideProps,
  BidirectionalTextOverrideRef,
} from "./BidirectionalTextOverride";

/**
 * Render the bidirectional text override client component.
 * @param {BidirectionalTextOverrideProps} props - The bidirectional text override client component properties
 * @param {BidirectionalTextOverrideRef} ref - The bidirectional text override client component reference
 * @returns The rendered bidirectional text override client component
 */

const BidirectionalTextOverrideClient = forwardRef<
  BidirectionalTextOverrideRef,
  BidirectionalTextOverrideProps
>(({ children, ...rest }, ref) => {
  return (
    <bdo ref={ref} {...rest}>
      {children}
    </bdo>
  );
});

BidirectionalTextOverrideClient.displayName = "BidirectionalTextOverrideClient";

export default BidirectionalTextOverrideClient;
