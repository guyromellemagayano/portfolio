'use client'

import { AudioHTMLAttributes, forwardRef } from 'react'

export type AudioRef = HTMLAudioElement
export type AudioProps = AudioHTMLAttributes<AudioRef>

/**
 * Render the audio component.
 * @param {AudioProps} props - The audio component properties.
 * @param {AudioRef} ref - The audio component reference.
 * @returns The rendered audio component.
 */
const Audio = forwardRef<AudioRef, AudioProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <audio ref={ref} {...rest}>
      {children}
    </audio>
  )
})

Audio.displayName = 'Audio'

export default Audio
