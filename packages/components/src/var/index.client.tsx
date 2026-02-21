"use client";

import React, { memo } from "react";

import { Var, type VarProps, type VarRef } from ".";

/** Render the variable client component. */
export const VarClient = React.forwardRef<VarRef, VarProps>((props, ref) => (
  <Var ref={ref} {...props} />
));

VarClient.displayName = "VarClient";

/** Memoized version of `VarClient` for performance optimization. */
export const MemoizedVarClient = memo(VarClient);
