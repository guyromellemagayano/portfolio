import { VideoHTMLAttributes, forwardRef } from 'react'

export type VideoRef = HTMLVideoElement
export type VideoProps = VideoHTMLAttributes<VideoRef>

/**
 * Render the video component.
 * @param children - The children of the video.
 * @param rest - The rest of the props of the video.
 * @returns The rendered video component.
 */
const Video = forwardRef<VideoRef, VideoProps>(({ children, ...rest }, ref) => {
  return (
    <video ref={ref} {...rest}>
      {children}
    </video>
  )
})

Video.displayName = 'Video'

export default Video
