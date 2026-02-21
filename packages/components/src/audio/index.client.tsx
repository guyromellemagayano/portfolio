"use client";

import React, { memo } from "react";

import { Audio, type AudioProps, type AudioRef } from ".";

/** Render the audio client component. */
export const AudioClient = React.forwardRef<AudioRef, AudioProps>(
  (props, ref) => <Audio {...props} ref={ref} />
);

AudioClient.displayName = "AudioClient";

/** Memoized version of `AudioClient` for performance optimization. */
export const MemoizedAudioClient = memo(AudioClient);
