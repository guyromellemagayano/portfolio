import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TrackClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TrackClient };
});
const MemoizedTrackClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTrackClient };
});

export type TrackRef = React.ComponentRef<"track">;

export interface TrackProps
  extends React.ComponentPropsWithoutRef<"track">, CommonComponentProps {}

/** Render the embed text track server component. */
export const Track = React.forwardRef<TrackRef, TrackProps>((props, ref) => {
  const {
    as: Component = "track",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTrackClient : TrackClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Track.displayName = "Track";
