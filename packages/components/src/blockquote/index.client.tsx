"use client";

import React, { memo } from "react";

import { Blockquote, type BlockquoteProps, type BlockquoteRef } from ".";

/** Render the blockquote client component. */
export const BlockquoteClient = React.forwardRef<
  BlockquoteRef,
  BlockquoteProps
>((props, ref) => <Blockquote ref={ref} {...props} />);

BlockquoteClient.displayName = "BlockquoteClient";

/** Memoized version of `BlockquoteClient` for performance optimization. */
export const MemoizedBlockquoteClient = memo(BlockquoteClient);
