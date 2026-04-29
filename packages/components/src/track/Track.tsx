import React from "react";

import { type CommonComponentProps } from "../types";

export type TrackRef = React.ComponentRef<"track">;

export interface TrackProps
  extends React.ComponentPropsWithoutRef<"track">, CommonComponentProps {}

/** Render the embed text track component. */
export const Track = React.forwardRef<TrackRef, TrackProps>((props, ref) => {
  const { as: Component = "track", ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Track.displayName = "Track";
