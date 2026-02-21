"use client";

import React, { memo } from "react";

import { Details, type DetailsProps, type DetailsRef } from ".";

/** Render the details disclosure client component. */
export const DetailsClient = React.forwardRef<DetailsRef, DetailsProps>(
  (props, ref) => <Details ref={ref} {...props} />
);

DetailsClient.displayName = "DetailsClient";

/** Memoized version of `DetailsClient` for performance optimization. */
export const MemoizedDetailsClient = memo(DetailsClient);
