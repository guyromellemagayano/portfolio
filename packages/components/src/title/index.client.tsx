"use client";

import React, { memo } from "react";

import { Title, type TitleProps, type TitleRef } from ".";

/** Render the document title client component. */
export const TitleClient = React.forwardRef<TitleRef, TitleProps>(
  (props, ref) => <Title ref={ref} {...props} />
);

TitleClient.displayName = "TitleClient";

/** Memoized version of `TitleClient` for performance optimization. */
export const MemoizedTitleClient = memo(TitleClient);
