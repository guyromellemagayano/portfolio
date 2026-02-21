"use client";

import React, { memo } from "react";

import { Slot, type SlotProps, type SlotRef } from ".";

/** Render the web component slot client component. */
export const SlotClient = React.forwardRef<SlotRef, SlotProps>((props, ref) => (
  <Slot ref={ref} {...props} />
));

SlotClient.displayName = "SlotClient";

/** Memoized version of `SlotClient` for performance optimization. */
export const MemoizedSlotClient = memo(SlotClient);
