"use client";

import React, { memo } from "react";

import { Kbd, type KbdProps, type KbdRef } from ".";

/** Render the keyboard input client component. */
export const KbdClient = React.forwardRef<KbdRef, KbdProps>((props, ref) => (
  <Kbd ref={ref} {...props} />
));

KbdClient.displayName = "KbdClient";

/** Memoized version of `KbdClient` for performance optimization. */
export const MemoizedKbdClient = memo(KbdClient);
