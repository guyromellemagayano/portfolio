"use client";

import React, { memo } from "react";

import { Body, type BodyProps, type BodyRef } from ".";

/**
 * Render the document body client component.
 */
export const BodyClient = React.forwardRef<BodyRef, BodyProps>((props, ref) => (
  <Body ref={ref} {...props} />
));

BodyClient.displayName = "BodyClient";

/**
 * Memoized version of `BodyClient` for performance optimization.
 */
export const MemoizedBodyClient = memo(BodyClient);
