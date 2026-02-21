"use client";

import React, { memo } from "react";

import { Footer, type FooterProps, type FooterRef } from ".";

/** Render the footer client component. */
export const FooterClient = React.forwardRef<FooterRef, FooterProps>(
  (props, ref) => <Footer ref={ref} {...props} />
);

FooterClient.displayName = "FooterClient";

/** Memoized version of `FooterClient` for performance optimization. */
export const MemoizedFooterClient = memo(FooterClient);
