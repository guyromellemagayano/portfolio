"use client";

import React, { memo } from "react";

import { Iframe, type IframeProps, type IframeRef } from ".";

/** Render the inline frame client component. */
export const IframeClient = React.forwardRef<IframeRef, IframeProps>(
  (props, ref) => <Iframe ref={ref} {...props} />
);

IframeClient.displayName = "IframeClient";

/** Memoized version of `IframeClient` for performance optimization. */
export const MemoizedIframeClient = memo(IframeClient);
