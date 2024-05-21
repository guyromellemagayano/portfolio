'use client'

import { ImageProps } from 'next/image'

import {
  ImageCtfComponentFeature,
  VideoCtfComponentFeature,
  type AssetFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { useLayoutContext } from '@guy-romelle-magayano/coin-colorful/hooks'

export type AssetCtfComponentFeatureProps = AssetFieldsFragment &
  Pick<ImageProps, 'layout' | 'objectFit' | 'objectPosition'> & {
    className?: string
    showDescription?: boolean
    onClick?: () => any
  }

/**
 * Renders an asset feature component for the `contentful` API to consume.
 * @param {AssetCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const AssetCtfComponentFeature = (props: AssetCtfComponentFeatureProps) => {
  const { contentType, url, showDescription, title, width, height } = props

  const layout = useLayoutContext()

  if (!contentType || !url) {
    return null
  }

  if (contentType?.length > 0 && contentType?.startsWith('image')) {
    return (
      <ImageCtfComponentFeature
        height={height || undefined}
        width={width || undefined}
        alt={title || ''}
        src={url || ''}
        showDescription={
          ['quote', 'product-table', 'info-block', 'duplex'].includes(
            layout.parent
          )
            ? false
            : showDescription
        }
      />
    )
  }

  if (contentType?.length > 0 && contentType?.startsWith('video')) {
    return <VideoCtfComponentFeature {...props} />
  }

  return null
}

AssetCtfComponentFeature.displayName = 'AssetCtfComponentFeature'

export default AssetCtfComponentFeature
