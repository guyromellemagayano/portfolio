"use client";

import React, { memo } from "react";

import { Meta, type MetaProps, type MetaRef } from ".";

/** Render the metadata client component. */
export const MetaClient = React.forwardRef<MetaRef, MetaProps>((props, ref) => (
  <Meta ref={ref} {...props} />
));

MetaClient.displayName = "MetaClient";

/** Memoized version of `MetaClient` for performance optimization. */
export const MemoizedMetaClient = memo(MetaClient);
