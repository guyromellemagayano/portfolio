"use client";

import React, { memo } from "react";

import { Aside, type AsideProps, type AsideRef } from ".";

/** Render the aside client component. */
export const AsideClient = React.forwardRef<AsideRef, AsideProps>(
  (props, ref) => <Aside ref={ref} {...props} />
);

AsideClient.displayName = "AsideClient";

/** Memoized version of `AsideClient` for performance optimization. */
export const MemoizedAsideClient = memo(AsideClient);
