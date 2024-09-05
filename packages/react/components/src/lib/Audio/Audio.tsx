import React from 'react'

export type AudioRef = HTMLAudioElement
export type AudioProps = React.AudioHTMLAttributes<AudioRef>

/**
 * Render the audio component.
 * @param {AudioProps} props - The audio component properties
 * @param {AudioRef} ref - The audio component reference
 * @returns The rendered audio component
 */
const Audio = React.forwardRef<AudioRef, AudioProps>(
  ({ children, ...rest }, ref) => {
    return (
      <audio ref={ref} {...rest}>
        {children}
      </audio>
    )
  }
)

Audio.displayName = 'Audio'

export default Audio
