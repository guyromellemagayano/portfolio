"use client";

import { forwardRef } from "react";

import type { AudioProps, AudioRef } from ".";

/**
 * Render the audio client component.
 * @param {AudioProps} props - The audio client component properties
 * @param {AudioRef} ref - The audio client component reference
 * @returns The rendered audio client component
 */
const AudioClient = forwardRef<AudioRef, AudioProps>(
  ({ children, ...rest }, ref) => {
    return (
      <audio ref={ref} {...rest}>
        {children}
      </audio>
    );
  }
);

AudioClient.displayName = "AudioClient";

export default AudioClient;
