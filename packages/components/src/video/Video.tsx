import { type VideoHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const VideoClient = lazy(async () => {
  const module = await import("./Video.client");
  return { default: module.VideoClient };
});

export type VideoRef = HTMLVideoElement;
export type VideoProps = VideoHTMLAttributes<VideoRef> & CommonComponentProps;

/**
 * Render the default video embed server component.
 * @param {VideoProps} props - The default video embed server component properties
 * @returns The rendered default video embed server component
 */
export const Video = ({ isClient = false, children, ...rest }: VideoProps) => {
  const element = <video {...rest}>{children}</video>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <VideoClient {...rest}>{children}</VideoClient>
      </Suspense>
    );
  }

  return element;
};

Video.displayName = "Video";
