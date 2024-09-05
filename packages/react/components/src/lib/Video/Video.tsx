'use client'

import React from 'react'

export type VideoRef = HTMLVideoElement
export type VideoProps = React.VideoHTMLAttributes<VideoRef>

/**
 * Render the video component.
 * @param {VideoProps} props - The video component properties
 * @param {VideoRef} ref - The video component reference
 * @returns The rendered video component
 */
const Video = React.forwardRef<VideoRef, VideoProps>(
  ({ children, ...rest }, ref) => {
    return (
      <video ref={ref} {...rest}>
        {children}
      </video>
    )
  }
)

Video.displayName = 'Video'

export default Video
