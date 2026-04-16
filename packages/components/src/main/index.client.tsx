"use client";

import React, { memo } from "react";

import { Main, type MainProps, type MainRef } from ".";

/** Render the main client component. */
export const MainClient = React.forwardRef<MainRef, MainProps>((props, ref) => (
  <Main ref={ref} {...props} />
));

MainClient.displayName = "MainClient";

/** Memoized version of `MainClient` for performance optimization. */
export const MemoizedMainClient = memo(MainClient);
