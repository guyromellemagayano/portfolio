"use client";

import React, { memo } from "react";

import { Picture, type PictureProps, type PictureRef } from ".";

/** Render the picture client component. */
export const PictureClient = React.forwardRef<PictureRef, PictureProps>(
  (props, ref) => <Picture ref={ref} {...props} />
);

PictureClient.displayName = "PictureClient";

/** Memoized version of `PictureClient` for performance optimization. */
export const MemoizedPictureClient = memo(PictureClient);
