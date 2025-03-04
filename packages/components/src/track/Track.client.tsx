"use client";

import { forwardRef } from "react";

import type { TrackProps, TrackRef } from "./Track";

/**
 * Render the embed text track client component.
 * @param {TrackProps} props - The embed text track client component properties
 * @param {TrackRef} ref - The embed text track client component reference
 * @returns The rendered embed text track client component
 */
export const TrackClient = forwardRef<TrackRef, TrackProps>(
  ({ ...rest }, ref) => {
    return <track ref={ref} {...rest} />;
  }
);

TrackClient.displayName = "TrackClient";
