"use client";

import { forwardRef } from "react";

import type { MapProps, MapRef } from "./Map";

/**
 * Render the image map client component.
 * @param {MapProps} props - The image map client component properties
 * @param {MapRef} ref - The image map client component reference
 * @returns The rendered image map client component
 */
export const MapClient = forwardRef<MapRef, MapProps>(
  ({ children, ...rest }, ref) => {
    return (
      <map ref={ref} {...rest}>
        {children}
      </map>
    );
  }
);

MapClient.displayName = "MapClient";
