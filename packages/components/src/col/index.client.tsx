"use client";

import React, { memo } from "react";

import { Col, type ColProps, type ColRef } from ".";

/** Render the column client component. */
export const ColClient = React.forwardRef<ColRef, ColProps>((props, ref) => (
  <Col ref={ref} {...props} />
));

ColClient.displayName = "ColClient";

/** Memoized version of `ColClient` for performance optimization. */
export const MemoizedColClient = memo(ColClient);
