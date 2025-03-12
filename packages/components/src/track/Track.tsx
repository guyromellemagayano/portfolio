import React, { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TrackClient = lazy(async () => {
  const module = await import("./Track.client");
  return { default: module.TrackClient };
});

export type TrackRef = React.ElementRef<"track">;
export type TrackProps = React.ComponentPropsWithoutRef<"track"> &
  CommonComponentProps;

/**
 * Render the default embed text track server component.
 * @param {TrackProps} props - The default embed text track server component properties
 * @returns The rendered default embed text track server component
 */
export const Track = ({ isClient = false, ...rest }: TrackProps) => {
  const element = <track {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TrackClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Track.displayName = "Track";
