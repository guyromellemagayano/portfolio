"use client";

import React, { memo } from "react";

import { Q, type QProps, type QRef } from ".";

/** Render the inline quotation client component. */
export const QClient = React.forwardRef<QRef, QProps>((props, ref) => (
  <Q ref={ref} {...props} />
));

QClient.displayName = "QClient";

/** Memoized version of `QClient` for performance optimization. */
export const MemoizedQClient = memo(QClient);
