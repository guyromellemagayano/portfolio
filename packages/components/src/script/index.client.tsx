"use client";

import React, { memo } from "react";

import { Script, type ScriptProps, type ScriptRef } from ".";

/** Render the script client component. */
export const ScriptClient = React.forwardRef<ScriptRef, ScriptProps>(
  (props, ref) => <Script ref={ref} {...props} />
);

ScriptClient.displayName = "ScriptClient";

/** Memoized version of `ScriptClient` for performance optimization. */
export const MemoizedScriptClient = memo(ScriptClient);
