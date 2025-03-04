"use client";

import { forwardRef } from "react";

import type { VideoProps, VideoRef } from "./Video";

/**
 * Render the video embed client component.
 * @param {VideoProps} props - The video embed client component properties
 * @param {VideoRef} ref - The video embed client component reference
 * @returns The rendered video embed client component
 */
export const VideoClient = forwardRef<VideoRef, VideoProps>(
  ({ children, ...rest }, ref) => {
    return (
      <video ref={ref} {...rest}>
        {children}
      </video>
    );
  }
);

VideoClient.displayName = "VideoClient";
