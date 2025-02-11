'use client';

import { type AudioHTMLAttributes, forwardRef } from 'react';

export type TAudioRef = HTMLAudioElement;
export type TAudioProps = AudioHTMLAttributes<TAudioRef>;

/**
 * Render the audio component.
 * @param {TAudioProps} props - The audio component properties
 * @param {TAudioRef} ref - The audio component reference
 * @returns The rendered audio component
 */
const Audio = forwardRef<TAudioRef, TAudioProps>(
  ({ children, ...rest }, ref) => {
    return (
      <audio ref={ref} {...rest}>
        {children}
      </audio>
    );
  },
);

Audio.displayName = 'Audio';

export default Audio;
