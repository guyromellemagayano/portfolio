"use client";

import React, { memo } from "react";

import { Ol, type OlProps, type OlRef } from ".";

/** Render the ordered list client component. */
export const OlClient = React.forwardRef<OlRef, OlProps>((props, ref) => (
  <Ol ref={ref} {...props} />
));

OlClient.displayName = "OlClient";

/** Memoized version of `OlClient` for performance optimization. */
export const MemoizedOlClient = memo(OlClient);
