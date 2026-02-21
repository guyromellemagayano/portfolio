"use client";

import React, { memo } from "react";

import { Header, type HeaderProps, type HeaderRef } from ".";

/** Render the header client component. */
export const HeaderClient = React.forwardRef<HeaderRef, HeaderProps>(
  (props, ref) => <Header ref={ref} {...props} />
);

HeaderClient.displayName = "HeaderClient";

/** Memoized version of `HeaderClient` for performance optimization. */
export const MemoizedHeaderClient = memo(HeaderClient);
