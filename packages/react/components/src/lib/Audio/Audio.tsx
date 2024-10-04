/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'

export type TAudioRef = HTMLAudioElement
export type TAudioProps = React.AudioHTMLAttributes<TAudioRef>

/**
 * Render the audio component.
 * @param {TAudioProps} props - The audio component properties
 * @param {TAudioRef} ref - The audio component reference
 * @returns The rendered audio component
 */
const Audio = React.forwardRef<TAudioRef, TAudioProps>(
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
