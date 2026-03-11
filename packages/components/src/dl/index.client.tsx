"use client";

import React, { memo } from "react";

import { Dl, type DlProps, type DlRef } from ".";

/** Render the description list client component. */
export const DlClient = React.forwardRef<DlRef, DlProps>((props, ref) => (
  <Dl ref={ref} {...props} />
));

DlClient.displayName = "DlClient";

/** Memoized version of `DlClient` for performance optimization. */
export const MemoizedDlClient = memo(DlClient);
