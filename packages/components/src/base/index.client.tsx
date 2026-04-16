"use client";

import React, { memo } from "react";

import { Base, type BaseProps, type BaseRef } from ".";

/** Render the base client component. */
export const BaseClient = React.forwardRef<BaseRef, BaseProps>((props, ref) => (
  <Base ref={ref} {...props} />
));

BaseClient.displayName = "BaseClient";

/** Memoized version of `BaseClient` for performance optimization. */
export const MemoizedBaseClient = memo(BaseClient);
