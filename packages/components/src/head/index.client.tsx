"use client";

import React, { memo } from "react";

import { Head, type HeadProps, type HeadRef } from ".";

/** Render the document metadata (header) client component. */
export const HeadClient = React.forwardRef<HeadRef, HeadProps>((props, ref) => (
  <Head ref={ref} {...props} />
));

HeadClient.displayName = "HeadClient";

/** Memoized version of `HeadClient` for performance optimization. */
export const MemoizedHeadClient = memo(HeadClient);
