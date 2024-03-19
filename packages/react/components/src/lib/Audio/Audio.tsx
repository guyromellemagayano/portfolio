import { AudioHTMLAttributes, forwardRef } from 'react'

export type AudioRef = HTMLAudioElement
export type AudioProps = AudioHTMLAttributes<AudioRef>

/**
 * Render the audio component.
 * @param children - The children of the audio.
 * @param rest - The rest of the props of the audio.
 * @returns The rendered audio component.
 */
const Audio = forwardRef<AudioRef, AudioProps>(({ children, ...rest }, ref) => {
  return (
    <audio ref={ref} {...rest}>
      {children}
    </audio>
  )
})

Audio.displayName = 'Audio'

export default Audio
