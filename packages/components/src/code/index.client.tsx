"use client";

import React, { memo } from "react";

import { Code, type CodeProps, type CodeRef } from ".";

/** Render the code client component. */
export const CodeClient = React.forwardRef<CodeRef, CodeProps>((props, ref) => (
  <Code ref={ref} {...props} />
));

CodeClient.displayName = "CodeClient";

/** Memoized version of `CodeClient` for performance optimization. */
export const MemoizedCodeClient = memo(CodeClient);
