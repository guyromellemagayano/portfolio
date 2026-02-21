import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const VideoClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.VideoClient };
});
const MemoizedVideoClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedVideoClient };
});

export type VideoRef = React.ComponentRef<"video">;

export interface VideoProps
  extends React.ComponentPropsWithoutRef<"video">, CommonComponentProps {}

/** Render the video embed server component. */
export const Video = React.forwardRef<VideoRef, VideoProps>((props, ref) => {
  const {
    as: Component = "video",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedVideoClient : VideoClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Video.displayName = "Video";
