import { type AudioHTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const AudioClient = lazy(() =>
  import("./index.client").then((m) => ({ default: m.default }))
);

export type AudioRef = HTMLAudioElement;
export type AudioProps = AudioHTMLAttributes<AudioRef> & {
  isClient?: boolean;
};

/**
 * Render the default audio server component.
 * @param {AudioProps} props - The default audio server component properties
 * @returns The rendered default audio server component
 */
export const Audio = ({ isClient = false, children, ...rest }: AudioProps) => {
  if (isClient) {
    return (
      <Suspense>
        <AudioClient {...rest}>{children} </AudioClient>
      </Suspense>
    );
  }

  return <audio {...rest}>{children}</audio>;
};

Audio.displayName = "Audio";
