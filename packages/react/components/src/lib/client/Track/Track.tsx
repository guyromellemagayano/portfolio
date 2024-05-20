'use client'

import { TrackHTMLAttributes, forwardRef } from 'react'

export type TrackRef = HTMLTrackElement
export type TrackProps = TrackHTMLAttributes<TrackRef>

/**
 * Render the track component.
 * @param {TrackProps} props - The track component properties.
 * @param {TrackRef} ref - The track component reference.
 * @returns The rendered track component.
 */
const Track = forwardRef<TrackRef, TrackProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <track ref={ref} {...rest}>
      {children}
    </track>
  )
})

Track.displayName = 'Track'

export default Track
