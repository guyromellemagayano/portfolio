"use client";

import React, { memo } from "react";

import { Cite, type CiteProps, type CiteRef } from ".";

/** Render the cite client component. */
export const CiteClient = React.forwardRef<CiteRef, CiteProps>((props, ref) => (
  <Cite ref={ref} {...props} />
));

CiteClient.displayName = "CiteClient";

/** Memoized version of `CiteClient` for performance optimization. */
export const MemoizedCiteClient = memo(CiteClient);
