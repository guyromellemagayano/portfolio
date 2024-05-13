import React, { useState } from 'react'

import { Box } from '@mui/material'
import Image, { ImageProps } from 'next/image'

export type ImageCtfComponentFeatureProps = ImageProps & {
  description?: string | null
  showDescription?: boolean
}

/**
 * Renders an image component for the `contentful` API to consume.
 * @param {ImageCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const ImageCtfComponentFeature = (props: ImageCtfComponentFeatureProps) => {
  const {
    src,
    description,
    showDescription = true,
    width,
    height,
    ...rest
  } = props

  const [loaded, setLoaded] = useState(false)

  if (!src) return null

  const blurUrl = new URL(String(src))
  blurUrl.searchParams.set('w', '100')

  return (
    <Box
      component="figure"
      margin="0"
      fontSize={0}
      style={{
        transition: '300ms ease-out',
        transitionProperty: 'opacity',
        opacity: loaded ? 1 : 0
      }}
    >
      <Image
        onLoad={() => {
          setLoaded(true)
        }}
        src={src}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurUrl.toString()}
        {...rest}
      />

      {showDescription && description && description?.length > 0 && (
        <figcaption>{description}</figcaption>
      )}
    </Box>
  )
}

ImageCtfComponentFeature.displayName = 'ImageCtfComponentFeature'

export default ImageCtfComponentFeature
