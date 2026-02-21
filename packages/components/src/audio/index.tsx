import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const AudioClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AudioClient };
});
const MemoizedAudioClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAudioClient };
});

export type AudioRef = React.ComponentRef<"audio">;

export interface AudioProps
  extends React.ComponentPropsWithoutRef<"audio">, CommonComponentProps {}

/** Render the audio server component. */
export const Audio = React.forwardRef<AudioRef, AudioProps>((props, ref) => {
  const {
    as: Component = "audio",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAudioClient : AudioClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Audio.displayName = "Audio";
