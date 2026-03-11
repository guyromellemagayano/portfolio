"use client";

import React, { memo } from "react";

import { Track, type TrackProps, type TrackRef } from ".";

/** Render the embed text track client component. */
export const TrackClient = React.forwardRef<TrackRef, TrackProps>(
  (props, ref) => <Track ref={ref} {...props} />
);

TrackClient.displayName = "TrackClient";

/** Memoized version of `TrackClient` for performance optimization. */
export const MemoizedTrackClient = memo(TrackClient);
