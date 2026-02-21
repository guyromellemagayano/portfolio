"use client";

import React, { memo } from "react";

import { Embed, type EmbedProps, type EmbedRef } from ".";

/** Render the embed external content client component. */
export const EmbedClient = React.forwardRef<EmbedRef, EmbedProps>(
  (props, ref) => <Embed ref={ref} {...props} />
);

EmbedClient.displayName = "EmbedClient";

/** Memoized version of `EmbedClient` for performance optimization. */
export const MemoizedEmbedClient = memo(EmbedClient);
