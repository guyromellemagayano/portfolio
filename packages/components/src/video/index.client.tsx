"use client";

import React, { memo } from "react";

import { Video, type VideoProps, type VideoRef } from ".";

/** Render the video embed client component. */
export const VideoClient = React.forwardRef<VideoRef, VideoProps>(
  (props, ref) => <Video ref={ref} {...props} />
);

VideoClient.displayName = "VideoClient";

/** Memoized version of `VideoClient` for performance optimization. */
export const MemoizedVideoClient = memo(VideoClient);
