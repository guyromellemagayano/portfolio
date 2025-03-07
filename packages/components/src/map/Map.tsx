import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const MapClient = lazy(async () => {
  const module = await import("./Map.client");
  return { default: module.MapClient };
});

export type MapRef = React.ElementRef<"map">;
export type MapProps = React.ComponentPropsWithoutRef<"map"> &
  CommonComponentProps;

/**
 * Render the default image map server component.
 * @param {MapProps} props - The default image map server component properties
 * @returns The rendered default image map server component
 */
export const Map = ({ isClient = false, children, ...rest }: MapProps) => {
  const element = <map {...rest}>{children}</map>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <MapClient {...rest}>{children}</MapClient>
      </Suspense>
    );
  }

  return element;
};

Map.displayName = "Map";
