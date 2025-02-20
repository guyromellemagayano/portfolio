import { lazy, Suspense } from "react";

import type { AudioProps } from "./Audio.client";

// Dynamically import the client component
const AudioClient = lazy(async () => {
  const module = await import("./Audio.client");
  return { default: module.AudioClient };
});

/**
 * Render the default audio server component.
 * @param {AudioProps} props - The default audio server component properties
 * @returns The rendered default audio server component
 */
export const Audio = ({ isClient = false, children, ...rest }: AudioProps) => {
  const element = <audio {...rest}>{children}</audio>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AudioClient {...rest}>{children} </AudioClient>
      </Suspense>
    );
  }

  return element;
};

Audio.displayName = "Audio";
