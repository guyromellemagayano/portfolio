import React from "react";

import { type CommonComponentProps } from "../types";

export type AudioRef = React.ComponentRef<"audio">;

export interface AudioProps
  extends React.ComponentPropsWithoutRef<"audio">, CommonComponentProps {}

/** Render the audio component. */
export const Audio = React.forwardRef<AudioRef, AudioProps>((props, ref) => {
  const { as: Component = "audio", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Audio.displayName = "Audio";
