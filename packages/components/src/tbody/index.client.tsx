"use client";

import React, { memo } from "react";

import { Tbody, type TbodyProps, type TbodyRef } from ".";

/** Render the table body client component. */
export const TbodyClient = React.forwardRef<TbodyRef, TbodyProps>(
  (props, ref) => <Tbody ref={ref} {...props} />
);

TbodyClient.displayName = "TbodyClient";

/** Memoized version of `TbodyClient` for performance optimization. */
export const MemoizedTbodyClient = memo(TbodyClient);
