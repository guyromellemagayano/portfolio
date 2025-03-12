import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SourceClient = lazy(async () => {
  const module = await import("./Source.client");
  return { default: module.SourceClient };
});

export type SourceRef = React.ElementRef<"source">;
export type SourceProps = React.ComponentPropsWithoutRef<"source"> &
  CommonComponentProps;

/**
 * Render the default media or image source server component.
 * @param {SourceProps} props - The default media or image source server component properties
 * @returns The rendered default media or image source server component
 */
export const Source = ({ isClient = false, ...rest }: SourceProps) => {
  const element = <source {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SourceClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Source.displayName = "Source";
