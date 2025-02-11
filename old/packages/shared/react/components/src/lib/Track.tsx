import React from 'react'

export type TTrackRef = HTMLTrackElement
export type TTrackProps = React.TrackHTMLAttributes<TTrackRef>

/**
 * Render the track component.
 * @param {TTrackProps} props - The track component properties
 * @param {TTrackRef} ref - The track component reference
 * @returns The rendered track component
 */
const Track = React.forwardRef<TTrackRef, TTrackProps>(({ ...rest }, ref) => {
  return <track ref={ref} {...rest} />
})

Track.displayName = 'Track'

export default Track
