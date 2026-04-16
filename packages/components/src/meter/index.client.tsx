"use client";

import React, { memo } from "react";

import { Meter, type MeterProps, type MeterRef } from ".";

/** Render the HTML meter client component. */
export const MeterClient = React.forwardRef<MeterRef, MeterProps>(
  (props, ref) => <Meter ref={ref} {...props} />
);

MeterClient.displayName = "MeterClient";

/** Memoized version of `MeterClient` for performance optimization. */
export const MemoizedMeterClient = memo(MeterClient);
