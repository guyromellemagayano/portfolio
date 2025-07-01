"use client";

import React, { memo } from "react";

import { Audio, type AudioProps, type AudioRef } from ".";

/**
 * Client-side audio component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const AudioClient = React.forwardRef<AudioRef, AudioProps>(
  (props, ref) => {
    // Simply delegate to the main component
    // The main component already handles all optimizations
    return <Audio ref={ref} {...props} />;
  }
);

AudioClient.displayName = "AudioClient";

// Memoized version for cases where props change frequently
export const MemoizedAudioClient = memo(AudioClient);

// Export default for convenience
export default AudioClient;
