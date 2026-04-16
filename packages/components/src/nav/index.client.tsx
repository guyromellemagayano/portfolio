"use client";

import React, { memo } from "react";

import { Nav, type NavProps, type NavRef } from ".";

/** Render the navigation section client component. */
export const NavClient = React.forwardRef<NavRef, NavProps>((props, ref) => (
  <Nav ref={ref} {...props} />
));

NavClient.displayName = "NavClient";

/** Memoized version of `NavClient` for performance optimization. */
export const MemoizedNavClient = memo(NavClient);
