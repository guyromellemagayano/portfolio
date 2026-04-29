import React from "react";

import { type CommonComponentProps } from "../types";

export type VideoRef = React.ComponentRef<"video">;

export interface VideoProps
  extends React.ComponentPropsWithoutRef<"video">, CommonComponentProps {}

/** Render the video embed component. */
export const Video = React.forwardRef<VideoRef, VideoProps>((props, ref) => {
  const { as: Component = "video", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Video.displayName = "Video";
