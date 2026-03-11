"use client";

import React, { memo } from "react";

import { Map, type MapProps, type MapRef } from ".";

/** Render the image map client component. */
export const MapClient = React.forwardRef<MapRef, MapProps>((props, ref) => (
  <Map ref={ref} {...props} />
));

MapClient.displayName = "MapClient";

/** Memoized version of `MapClient` for performance optimization. */
export const MemoizedMapClient = memo(MapClient);
