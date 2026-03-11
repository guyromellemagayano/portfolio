"use client";

import React, { memo } from "react";

import { Heading, type HeadingProps, type HeadingRef } from ".";

/** Render the HTML section heading client component. */
export const HeadingClient = React.forwardRef<HeadingRef, HeadingProps>(
  (props, ref) => <Heading ref={ref} {...props} />
);

HeadingClient.displayName = "HeadingClient";

/** Memoized version of `HeadingClient` for performance optimization. */
export const MemoizedHeadingClient = memo(HeadingClient);
