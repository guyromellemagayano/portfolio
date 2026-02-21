"use client";

import React, { memo } from "react";

import { Dt, type DtProps, type DtRef } from ".";

/** Render the description term client component. */
export const DtClient = React.forwardRef<DtRef, DtProps>((props, ref) => (
  <Dt ref={ref} {...props} />
));

DtClient.displayName = "DtClient";

/** Memoized version of `DtClient` for performance optimization. */
export const MemoizedDtClient = memo(DtClient);
