"use client";

import React, { memo } from "react";

import { Sub, type SubProps, type SubRef } from ".";

/** Render the subscript client component. */
export const SubClient = React.forwardRef<SubRef, SubProps>((props, ref) => (
  <Sub ref={ref} {...props} />
));

SubClient.displayName = "SubClient";

/** Memoized version of `SubClient` for performance optimization. */
export const MemoizedSubClient = memo(SubClient);
