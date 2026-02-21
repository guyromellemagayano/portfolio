"use client";

import React, { memo } from "react";

import { Link, type LinkProps, type LinkRef } from ".";

/** Render the external resource link client component. */
export const LinkClient = React.forwardRef<LinkRef, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));

LinkClient.displayName = "LinkClient";

/** Memoized version of `LinkClient` for performance optimization. */
export const MemoizedLinkClient = memo(LinkClient);
