"use client";

import React, { memo } from "react";

import { U, type UProps, type URef } from ".";

/** Render the unarticulated annotation (underline) client component. */
export const UClient = React.forwardRef<URef, UProps>((props, ref) => (
  <U ref={ref} {...props} />
));

UClient.displayName = "UClient";

/** Memoized version of `UClient` for performance optimization. */
export const MemoizedUClient = memo(UClient);
