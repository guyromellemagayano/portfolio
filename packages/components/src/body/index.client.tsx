import { forwardRef, memo } from "react";

import type { BodyProps, BodyRef } from "./index";

/**
 * Universal body client component with enhanced interactivity.
 * Supports client-side rendering with memoization.
 */
export const BodyClient = forwardRef<BodyRef, BodyProps>(
  ({ as: Component = "body", children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

BodyClient.displayName = "BodyClient";

// Memoized version of BodyClient for performance optimization
export const MemoizedBodyClient = memo(BodyClient);

MemoizedBodyClient.displayName = "MemoizedBodyClient";
