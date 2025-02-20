import { type AudioHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const AudioClient = lazy(async () => {
  const module = await import("./Audio.client");
  return { default: module.default };
});

export type AudioRef = HTMLAudioElement;
export type AudioProps = AudioHTMLAttributes<AudioRef> & CommonComponentProps;

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
