"use client";

import React, { memo } from "react";

import { I, type IProps, type IRef } from ".";

/** Render the idiomatic text client component. */
export const IClient = React.forwardRef<IRef, IProps>((props, ref) => (
  <I ref={ref} {...props} />
));

IClient.displayName = "IClient";

/** Memoized version of `IClient` for performance optimization. */
export const MemoizedIClient = memo(IClient);
