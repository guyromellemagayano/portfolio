"use client";

import React from "react";

import { Body, type BodyProps, type BodyRef } from ".";

/** Render the body server component. */
export const BodyClient = React.forwardRef<BodyRef, BodyProps>((props, ref) => (
  <Body ref={ref} {...props} />
));

BodyClient.displayName = "BodyClient";

/** Memoized version of `BodyClient` for performance optimization. */
export const MemoizedBodyClient = React.memo(BodyClient);
