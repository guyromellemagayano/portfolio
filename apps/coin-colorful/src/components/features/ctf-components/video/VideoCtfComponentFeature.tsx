import { makeStyles } from '@mui/styles'

import { Video } from '@guy-romelle-magayano/react-components'
import { Div, P } from '@guy-romelle-magayano/react-components/server'

import { type AssetFieldsFragment } from '@guy-romelle-magayano/coin-colorful/components'

const useStyles = makeStyles(() => ({
  image: {
    width: '100%'
  },

  video: {
    width: '100%'
  },

  caption: {
    color: '#797979',
    fontSize: '1.8rem',
    fontStyle: 'italic',
    lineHeight: 1.389,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '4.7rem',
    maxWidth: '77rem',
    textAlign: 'center'
  }
}))

export type VideoCtfComponentFeatureProps = AssetFieldsFragment & {
  showDescription?: boolean
  autoplay?: boolean
  className?: string
}

/**
 * Renders the video feature component for the `contentful` API to consume.
 * @param {VideoCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const VideoCtfComponentFeature = (props: VideoCtfComponentFeatureProps) => {
  const { description, url, showDescription, autoplay, className } = props

  const classes = useStyles()

  return (
    <Div className={className}>
      <Video
        src={url!}
        autoPlay={autoplay}
        controls
        className={classes.video}
      />

      {showDescription && description && description?.length > 0 && (
        <P className={classes.caption}>{description}</P>
      )}
    </Div>
  )
}

VideoCtfComponentFeature.displayName = 'VideoCtfComponentFeature'

export default VideoCtfComponentFeature
