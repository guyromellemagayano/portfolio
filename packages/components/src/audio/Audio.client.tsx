"use client";

import { type AudioHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type AudioRef = HTMLAudioElement;
export type AudioProps = AudioHTMLAttributes<AudioRef> & CommonComponentProps;

/**
 * Render the audio client component.
 * @param {AudioProps} props - The audio client component properties
 * @param {AudioRef} ref - The audio client component reference
 * @returns The rendered audio client component
 */
export const AudioClient = forwardRef<AudioRef, AudioProps>(
  ({ children, ...rest }, ref) => {
    return (
      <audio ref={ref} {...rest}>
        {children}
      </audio>
    );
  }
);

AudioClient.displayName = "AudioClient";
