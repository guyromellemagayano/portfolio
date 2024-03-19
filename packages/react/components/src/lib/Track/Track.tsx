import { TrackHTMLAttributes, forwardRef } from 'react'


export type TrackRef = HTMLTrackElement
export type TrackProps = TrackHTMLAttributes<TrackRef>

/**
 * Render the track component.
 * @param children - The children of the track.
 * @param rest - The rest of the props of the track.
 * @returns The rendered track component.
 */
const Track = forwardRef<TrackRef, TrackProps>(({ children, ...rest }, ref) => {
  return (
    <track ref={ref} {...rest} >
      {children}
    </track>
  )
})

Track.displayName = 'Track'

export default Track
