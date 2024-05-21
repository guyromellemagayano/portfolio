'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  HeroBannerCtfComponentFeature,
  useCtfHeroBannerQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type HeroBannerGqlCtfComponentFeatureProps = {
  id: string
  locale: string
  preview: boolean
}

/**
 * Renders the hero banner `graphql` feature component for the `contentful` API to consume.
 * @param {HeroBannerGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const HeroBannerGqlCtfComponentFeature = (
  props: HeroBannerGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview } = props

  const { data, isLoading } = useCtfHeroBannerQuery({
      id,
      locale,
      preview
    }),
    componentHeroBanner = useContentfulLiveUpdates(
      data?.componentHeroBanner &&
        Object.keys(data?.componentHeroBanner)?.length > 0
        ? data.componentHeroBanner
        : null
    )

  if (!componentHeroBanner || isLoading) return null

  return (
    componentHeroBanner &&
    Object.keys(componentHeroBanner)?.length > 0 && (
      <HeroBannerCtfComponentFeature {...componentHeroBanner} />
    )
  )
}

HeroBannerGqlCtfComponentFeature.displayName =
  'HeroBannerGqlCtfComponentFeature'

export default HeroBannerGqlCtfComponentFeature
