import { forwardRef, memo } from "react";

import type { BlockquoteProps, BlockquoteRef } from "./index";

/**
 * Render the blockquote client component.
 * @param {BlockquoteProps} props - The blockquote client component properties
 * @param {BlockquoteRef} ref - The blockquote client component reference
 * @returns The rendered blockquote client component
 */
export const BlockquoteClient = forwardRef<BlockquoteRef, BlockquoteProps>(
  ({ as: Component = "blockquote", children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
BlockquoteClient.displayName = "BlockquoteClient";

// Memoized version of `BlockquoteClient`.
export const MemoizedBlockquoteClient = memo(BlockquoteClient);
